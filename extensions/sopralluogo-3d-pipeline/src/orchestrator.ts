import { spawn } from "child_process";
import { join } from "path";
import { writeFile, readdir, unlink } from "fs/promises";
import type { PipelineProject, StageName, StageResult } from "./types";
import { writeProject, projectDir, pythonPath, ffmpegPath, tttlrmCheckpoint, vbvrModel } from "./utils";
import { flushGPUMemory, getMemoryPressure, adaptiveChunkSize } from "./memory";

// ── Spawn helper ─────────────────────────────────────────────────

function spawnProcess(cmd: string, args: string[], cwd: string): Promise<{ stdout: string; stderr: string }> {
  return new Promise((resolve, reject) => {
    const proc = spawn(cmd, args, { cwd, env: { ...process.env, PYTORCH_MPS_HIGH_WATERMARK_RATIO: "0.0" } });
    let stdout = "";
    let stderr = "";

    proc.stdout?.on("data", (d: Buffer) => {
      stdout += d.toString();
    });
    proc.stderr?.on("data", (d: Buffer) => {
      stderr += d.toString();
    });

    proc.on("close", (code) => {
      if (code === 0) resolve({ stdout, stderr });
      else reject(new Error(`Process exited with code ${code}\n${stderr}`));
    });

    proc.on("error", (err) => reject(err));
  });
}

// ── Stage helpers ────────────────────────────────────────────────

function findStage(project: PipelineProject, name: StageName): StageResult {
  const stage = project.stages.find((s) => s.stage === name);
  if (!stage) throw new Error(`Stage ${name} not found in project`);
  return stage;
}

async function startStage(project: PipelineProject, name: StageName): Promise<void> {
  const stage = findStage(project, name);
  stage.status = "running";
  stage.startedAt = new Date().toISOString();
  stage.logs.push(`[${new Date().toLocaleTimeString()}] Stage ${name} started`);

  // Update project status to match current stage
  const statusMap: Record<StageName, PipelineProject["status"]> = {
    spatial: "spatial",
    render: "rendering",
    reasoning: "reasoning",
    composite: "compositing",
  };
  project.status = statusMap[name];
  await writeProject(project);
}

async function completeStage(project: PipelineProject, name: StageName, outputPath?: string): Promise<void> {
  const stage = findStage(project, name);
  stage.status = "done";
  stage.finishedAt = new Date().toISOString();
  stage.outputPath = outputPath;
  stage.logs.push(`[${new Date().toLocaleTimeString()}] Stage ${name} completed`);

  const pressure = await getMemoryPressure();
  stage.memoryPeakGB = Math.round((pressure / 100) * 32 * 10) / 10;
  await writeProject(project);
}

async function failStage(project: PipelineProject, name: StageName, error: string): Promise<void> {
  const stage = findStage(project, name);
  stage.status = "failed";
  stage.finishedAt = new Date().toISOString();
  stage.logs.push(`[${new Date().toLocaleTimeString()}] ERROR: ${error}`);
  project.status = "failed";
  project.error = error;
  await writeProject(project);
}

function appendLog(project: PipelineProject, name: StageName, line: string): void {
  const stage = findStage(project, name);
  stage.logs.push(`[${new Date().toLocaleTimeString()}] ${line}`);
}

// ── Pipeline Stages ──────────────────────────────────────────────

async function runSpatial(project: PipelineProject): Promise<string> {
  const cwd = projectDir(project.id);
  const outputPly = join(cwd, "scene.ply");
  const py = pythonPath();
  const checkpoint = tttlrmCheckpoint();

  const args = [
    "-m",
    "tttlrm.generate",
    "--input",
    project.inputVideoPath,
    "--checkpoint",
    checkpoint,
    "--output",
    outputPly,
    "--device",
    "mps",
    "--num-views",
    String(project.config.numViews),
    "--max-memory",
    String(project.config.maxSpatialMemoryGB),
  ];

  if (project.poseDataPath) {
    args.push("--poses", project.poseDataPath);
  }

  appendLog(project, "spatial", `Running: python ${args.join(" ")}`);
  await writeProject(project);

  await spawnProcess(py, args, cwd);
  return outputPly;
}

async function runRender(project: PipelineProject): Promise<string> {
  const cwd = projectDir(project.id);
  const scenePly = join(cwd, "scene.ply");
  const outputMp4 = join(cwd, "tour.mp4");
  const py = pythonPath();

  const args = [
    "-m",
    "gaussian_splatting.render",
    "--scene",
    scenePly,
    "--trajectory",
    project.config.cameraTrajectory,
    "--resolution",
    project.config.renderResolution,
    "--fps",
    String(project.config.renderFps),
    "--output",
    outputMp4,
  ];

  appendLog(project, "render", `Running: python ${args.join(" ")}`);
  await writeProject(project);

  await spawnProcess(py, args, cwd);
  return outputMp4;
}

async function runReasoning(project: PipelineProject): Promise<string[]> {
  const cwd = projectDir(project.id);
  const tourMp4 = join(cwd, "tour.mp4");
  const py = pythonPath();
  const ff = ffmpegPath();
  const model = vbvrModel();
  const outputChunks: string[] = [];

  // Split tour video into chunks using ffmpeg
  appendLog(project, "reasoning", `Splitting tour.mp4 into ${project.config.chunkFrames}-frame chunks`);
  await writeProject(project);

  // Get video frame count via ffprobe
  let totalFrames = 300; // fallback estimate
  try {
    const { stdout } = await spawnProcess(ff.replace("ffmpeg", "ffprobe"), [
      "-v",
      "error",
      "-count_frames",
      "-select_streams",
      "v:0",
      "-show_entries",
      "stream=nb_read_frames",
      "-of",
      "csv=p=0",
      tourMp4,
    ], cwd);
    totalFrames = parseInt(stdout.trim(), 10) || totalFrames;
  } catch {
    appendLog(project, "reasoning", "Could not probe frame count, using estimate");
  }

  const baseChunk = project.config.chunkFrames;
  let offset = 0;
  let chunkIndex = 0;

  while (offset < totalFrames) {
    // Adaptive chunk sizing based on memory pressure
    const pressure = await getMemoryPressure();
    const currentChunk = project.config.autoChunkReduction
      ? adaptiveChunkSize(baseChunk, pressure)
      : baseChunk;

    const chunkFile = join(cwd, `chunk_${chunkIndex}.mp4`);
    const outputFile = join(cwd, `infographic_${chunkIndex}.mp4`);

    // Extract chunk with ffmpeg
    const startTime = (offset / project.config.renderFps).toFixed(3);
    const duration = (currentChunk / project.config.renderFps).toFixed(3);

    await spawnProcess(ff, [
      "-y",
      "-i",
      tourMp4,
      "-ss",
      startTime,
      "-t",
      duration,
      "-c",
      "copy",
      chunkFile,
    ], cwd);

    // Run VBVR on chunk
    const vbvrArgs = [
      "-m",
      "vbvr.inference",
      "--model-path",
      model,
      "--input",
      chunkFile,
      "--prompt",
      project.config.vbvrPrompt,
      "--quantize",
      project.config.quantization,
      "--output",
      outputFile,
    ];

    if (project.config.cpuOffload) {
      vbvrArgs.push("--cpu-offload");
    }

    // Inject last frame of previous chunk as visual condition
    if (chunkIndex > 0) {
      const prevOutput = join(cwd, `infographic_${chunkIndex - 1}.mp4`);
      vbvrArgs.push("--condition-frame-source", prevOutput);
    }

    appendLog(project, "reasoning", `Chunk ${chunkIndex}: frames ${offset}–${offset + currentChunk} (pressure: ${pressure}%)`);
    await writeProject(project);

    await spawnProcess(py, vbvrArgs, cwd);
    outputChunks.push(outputFile);

    // Cleanup raw chunk file
    try {
      await unlink(chunkFile);
    } catch {
      // ignore
    }

    offset += currentChunk;
    chunkIndex++;
  }

  return outputChunks;
}

async function runComposite(project: PipelineProject, chunks: string[]): Promise<string> {
  const cwd = projectDir(project.id);
  const ff = ffmpegPath();
  const concatFile = join(cwd, "chunks.txt");
  const finalMp4 = join(cwd, "final.mp4");

  // Write ffmpeg concat file
  const concatContent = chunks.map((c) => `file '${c}'`).join("\n");
  await writeFile(concatFile, concatContent, "utf-8");

  appendLog(project, "composite", `Concatenating ${chunks.length} chunks into final.mp4`);
  await writeProject(project);

  await spawnProcess(ff, [
    "-y",
    "-f",
    "concat",
    "-safe",
    "0",
    "-i",
    concatFile,
    "-c",
    "copy",
    finalMp4,
  ], cwd);

  // Cleanup intermediate infographic chunks
  for (const chunk of chunks) {
    try {
      await unlink(chunk);
    } catch {
      // ignore
    }
  }
  try {
    await unlink(concatFile);
  } catch {
    // ignore
  }

  return finalMp4;
}

// ── Main Pipeline Runner ─────────────────────────────────────────

export async function runPipeline(project: PipelineProject): Promise<void> {
  try {
    // Stage 1: Spatial Reconstruction (tttLRM)
    await startStage(project, "spatial");
    const scenePly = await runSpatial(project);
    await completeStage(project, "spatial", scenePly);

    // Flush memory between stages
    appendLog(project, "spatial", "Flushing GPU memory...");
    await flushGPUMemory();

    // Stage 2: 3DGS Rendering
    await startStage(project, "render");
    const tourMp4 = await runRender(project);
    await completeStage(project, "render", tourMp4);

    await flushGPUMemory();

    // Stage 3: Video Reasoning (VBVR) with temporal chunking
    await startStage(project, "reasoning");
    const chunks = await runReasoning(project);
    await completeStage(project, "reasoning");

    await flushGPUMemory();

    // Stage 4: Composite final video
    await startStage(project, "composite");
    const finalMp4 = await runComposite(project, chunks);
    await completeStage(project, "composite", finalMp4);

    // Done
    project.status = "done";
    await writeProject(project);
  } catch (err) {
    const currentStage = project.stages.find((s) => s.status === "running");
    const stageName = currentStage?.stage ?? "spatial";
    await failStage(project, stageName, err instanceof Error ? err.message : String(err));
  }
}

// ── Single-stage runners (for re-launch) ─────────────────────────

export async function runSingleStage(project: PipelineProject, stage: StageName): Promise<void> {
  try {
    await startStage(project, stage);

    switch (stage) {
      case "spatial": {
        const out = await runSpatial(project);
        await completeStage(project, stage, out);
        break;
      }
      case "render": {
        const out = await runRender(project);
        await completeStage(project, stage, out);
        break;
      }
      case "reasoning": {
        const chunks = await runReasoning(project);
        await completeStage(project, stage);
        // Store chunk paths for composite
        const stage2 = findStage(project, stage);
        stage2.outputPath = chunks.join(",");
        await writeProject(project);
        break;
      }
      case "composite": {
        const reasoningStage = findStage(project, "reasoning");
        const chunkPaths = reasoningStage.outputPath?.split(",") ?? [];
        if (chunkPaths.length === 0) throw new Error("No reasoning output chunks found");
        const out = await runComposite(project, chunkPaths);
        await completeStage(project, stage, out);
        break;
      }
    }

    await flushGPUMemory();
  } catch (err) {
    await failStage(project, stage, err instanceof Error ? err.message : String(err));
  }
}
