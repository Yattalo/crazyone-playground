import { Action, ActionPanel, Detail, Icon, Color, open } from "@raycast/api";
import { usePromise } from "@raycast/utils";
import React, { useState, useEffect, useCallback } from "react";
import { STAGE_ORDER, STAGE_LABELS } from "./types";
import type { PipelineProject, StageResult } from "./types";
import { scanProjects, projectDir, formatDuration, truncate } from "./utils";
import { getMemoryPressure, memoryLabel } from "./memory";

function stageIcon(stage: StageResult): string {
  switch (stage.status) {
    case "done":
      return "✅";
    case "running":
      return "🔄";
    case "failed":
      return "❌";
    default:
      return "⬜";
  }
}

function buildMarkdown(project: PipelineProject | null, pressure: number): string {
  if (!project) {
    return `# Pipeline Monitor

> Nessuna pipeline attiva. Usa **Launch Pipeline** per avviarne una.

## Stato
\`IDLE\` — In attesa di un nuovo progetto.
`;
  }

  const mem = memoryLabel(pressure);
  const lines: string[] = [];

  lines.push(`# ${project.name}`);
  lines.push("");
  lines.push("## Avanzamento Pipeline");
  lines.push("");

  for (const stageName of STAGE_ORDER) {
    const stage = project.stages.find((s) => s.stage === stageName);
    if (!stage) continue;

    const icon = stageIcon(stage);
    const label = STAGE_LABELS[stageName];
    let detail = "";

    if (stage.status === "running" && stage.startedAt) {
      detail = ` — in corso da ${formatDuration(stage.startedAt)}`;
    } else if (stage.status === "done" && stage.startedAt && stage.finishedAt) {
      detail = ` — completato in ${formatDuration(stage.startedAt, stage.finishedAt)}`;
    } else if (stage.status === "failed") {
      detail = " — FALLITO";
    }

    lines.push(`${icon} **${label}**${detail}`);
  }

  lines.push("");
  lines.push("---");
  lines.push("");
  lines.push(`## Memoria: ${mem.text}`);
  lines.push("");

  // Show pressure bar
  const filled = Math.round(pressure / 5);
  const bar = "█".repeat(filled) + "░".repeat(20 - filled);
  lines.push(`\`[${bar}]\` ${pressure}%`);

  // Show logs from active or last stage
  const activeStage =
    project.stages.find((s) => s.status === "running") ||
    [...project.stages].reverse().find((s) => s.status === "done" || s.status === "failed");

  if (activeStage && activeStage.logs.length > 0) {
    lines.push("");
    lines.push(`## Log — ${STAGE_LABELS[activeStage.stage]}`);
    lines.push("");
    lines.push("```");
    const recentLogs = activeStage.logs.slice(-20);
    for (const log of recentLogs) {
      lines.push(truncate(log, 120));
    }
    lines.push("```");
  }

  if (project.error) {
    lines.push("");
    lines.push("## Errore");
    lines.push("");
    lines.push(`\`\`\`\n${project.error}\n\`\`\``);
  }

  return lines.join("\n");
}

function buildMetadata(project: PipelineProject | null): React.ReactNode {
  if (!project) {
    return (
      <Detail.Metadata>
        <Detail.Metadata.Label title="Stato" text="Idle" icon={Icon.Clock} />
      </Detail.Metadata>
    );
  }

  return (
    <Detail.Metadata>
      <Detail.Metadata.Label title="Progetto" text={project.name} />
      <Detail.Metadata.Label title="Stato" text={project.status} />
      <Detail.Metadata.Separator />
      <Detail.Metadata.Label title="Input" text={truncate(project.inputVideoPath, 40)} />
      {project.poseDataPath && <Detail.Metadata.Label title="Pose Data" text={truncate(project.poseDataPath, 40)} />}
      <Detail.Metadata.Separator />
      <Detail.Metadata.Label title="Risoluzione" text={project.config.renderResolution} />
      <Detail.Metadata.Label title="Traiettoria" text={project.config.cameraTrajectory} />
      <Detail.Metadata.Label title="Quantizzazione" text={project.config.quantization} />
      <Detail.Metadata.Label title="Chunk" text={`${project.config.chunkFrames} frames`} />
      <Detail.Metadata.Label title="CPU Offload" text={project.config.cpuOffload ? "Sì" : "No"} />
      <Detail.Metadata.Separator />
      <Detail.Metadata.Label title="Creato" text={new Date(project.createdAt).toLocaleString()} />
      {project.stages.find((s) => s.status === "done" && s.stage === "composite")?.outputPath && (
        <Detail.Metadata.Label title="Output" text="final.mp4" icon={{ source: Icon.Video, tintColor: Color.Green }} />
      )}
    </Detail.Metadata>
  );
}

export default function PipelineMonitor() {
  const [pressure, setPressure] = useState(0);

  const {
    data: projects,
    isLoading,
    revalidate,
  } = usePromise(scanProjects);

  // Find most recently active project
  const active =
    projects?.find((p) => !["done", "failed", "configured"].includes(p.status)) ||
    projects?.[0] ||
    null;

  // Poll every 2 seconds
  const poll = useCallback(async () => {
    const p = await getMemoryPressure();
    setPressure(p);
    revalidate();
  }, [revalidate]);

  useEffect(() => {
    const interval = setInterval(poll, 2000);
    poll();
    return () => clearInterval(interval);
  }, [poll]);

  const markdown = buildMarkdown(active, pressure);

  return (
    <Detail
      isLoading={isLoading}
      markdown={markdown}
      metadata={buildMetadata(active)}
      actions={
        <ActionPanel>
          <Action title="Aggiorna" icon={Icon.ArrowClockwise} onAction={poll} />
          {active && (
            <Action
              title="Apri Cartella Progetto"
              icon={Icon.Folder}
              onAction={() => open(projectDir(active.id))}
            />
          )}
          {active?.stages.find((s) => s.stage === "composite" && s.status === "done")?.outputPath && (
            <Action.Open
              title="Apri Video Finale"
              target={active.stages.find((s) => s.stage === "composite")!.outputPath!}
            />
          )}
        </ActionPanel>
      }
    />
  );
}
