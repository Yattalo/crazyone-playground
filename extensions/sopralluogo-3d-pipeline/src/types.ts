// ── Pipeline Project ──────────────────────────────────────────────

export type PipelineStatus =
  | "configured"
  | "spatial"
  | "rendering"
  | "reasoning"
  | "compositing"
  | "done"
  | "failed";

export type StageName = "spatial" | "render" | "reasoning" | "composite";

export type StageStatus = "pending" | "running" | "done" | "failed";

export type CameraTrajectory = "orbit" | "flythrough" | "custom";

export type Quantization = "4bit" | "8bit";

export interface PipelineConfig {
  // Modulo Spaziale (tttLRM)
  numViews: number;
  maxSpatialMemoryGB: number;

  // Modulo Render (3DGS)
  renderResolution: string;
  renderFps: number;
  cameraTrajectory: CameraTrajectory;

  // Modulo Ragionamento (VBVR)
  vbvrPrompt: string;
  chunkFrames: number;
  quantization: Quantization;
  cpuOffload: boolean;

  // Orchestratore
  maxMemoryGB: number;
  autoChunkReduction: boolean;
}

export interface StageResult {
  stage: StageName;
  status: StageStatus;
  startedAt?: string;
  finishedAt?: string;
  outputPath?: string;
  memoryPeakGB?: number;
  logs: string[];
}

export interface PipelineProject {
  id: string;
  name: string;
  status: PipelineStatus;
  inputVideoPath: string;
  poseDataPath?: string;
  outputDir: string;
  config: PipelineConfig;
  stages: StageResult[];
  createdAt: string;
  updatedAt: string;
  error?: string;
}

// ── Environment Check ────────────────────────────────────────────

export interface EnvironmentCheck {
  name: string;
  command: string;
  ok: boolean;
  version?: string;
  error?: string;
}

// ── Preferences ──────────────────────────────────────────────────

export interface Preferences {
  projectsRoot: string;
  pythonPath: string;
  tttlrmCheckpoint: string;
  vbvrModel: string;
  ffmpegPath: string;
  maxMemoryGB: string;
}

// ── Stage display metadata ───────────────────────────────────────

export const STAGE_ORDER: StageName[] = ["spatial", "render", "reasoning", "composite"];

export const STAGE_LABELS: Record<StageName, string> = {
  spatial: "Ricostruzione 3D (tttLRM)",
  render: "Rendering Tour (3DGS)",
  reasoning: "Infografica AI (VBVR)",
  composite: "Composizione Finale (FFmpeg)",
};

export const STATUS_ICONS: Record<PipelineStatus, string> = {
  configured: "⚙️",
  spatial: "🔵",
  rendering: "🟡",
  reasoning: "🟣",
  compositing: "🟠",
  done: "✅",
  failed: "❌",
};
