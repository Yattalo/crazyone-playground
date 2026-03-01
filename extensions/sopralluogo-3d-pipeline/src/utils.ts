import { getPreferenceValues } from "@raycast/api";
import { readdir, readFile, writeFile, mkdir } from "fs/promises";
import { resolve, join } from "path";
import { randomUUID } from "crypto";
import type { PipelineProject, Preferences } from "./types";

// ── Preferences ──────────────────────────────────────────────────

export function prefs(): Preferences {
  return getPreferenceValues<Preferences>();
}

export function projectsRoot(): string {
  return resolve(prefs().projectsRoot.replace(/^~/, process.env.HOME ?? ""));
}

export function pythonPath(): string {
  return resolve(prefs().pythonPath.replace(/^~/, process.env.HOME ?? ""));
}

export function ffmpegPath(): string {
  const p = prefs().ffmpegPath || "ffmpeg";
  return p === "ffmpeg" ? p : resolve(p.replace(/^~/, process.env.HOME ?? ""));
}

export function maxMemoryGB(): number {
  return parseInt(prefs().maxMemoryGB, 10) || 24;
}

export function tttlrmCheckpoint(): string {
  return resolve(prefs().tttlrmCheckpoint.replace(/^~/, process.env.HOME ?? ""));
}

export function vbvrModel(): string {
  return resolve(prefs().vbvrModel.replace(/^~/, process.env.HOME ?? ""));
}

// ── String helpers ───────────────────────────────────────────────

export function sanitizeInput(input: string): string {
  return input.trim().replace(/[\x00-\x1f\x7f]/g, "");
}

export function toSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function formatDate(date: Date): string {
  return date.toISOString().split("T")[0];
}

export function truncate(str: string, maxLength: number): string {
  return str.length > maxLength ? str.slice(0, maxLength - 3) + "..." : str;
}

export function generateId(): string {
  return randomUUID().split("-")[0];
}

// ── Project I/O ──────────────────────────────────────────────────

export function projectDir(projectId: string): string {
  return join(projectsRoot(), projectId);
}

export function projectJsonPath(projectId: string): string {
  return join(projectDir(projectId), "project.json");
}

export async function readProject(projectId: string): Promise<PipelineProject> {
  const raw = await readFile(projectJsonPath(projectId), "utf-8");
  return JSON.parse(raw) as PipelineProject;
}

export async function writeProject(project: PipelineProject): Promise<void> {
  const dir = projectDir(project.id);
  await mkdir(dir, { recursive: true });
  project.updatedAt = new Date().toISOString();
  await writeFile(join(dir, "project.json"), JSON.stringify(project, null, 2), "utf-8");
}

export async function scanProjects(): Promise<PipelineProject[]> {
  const root = projectsRoot();
  await mkdir(root, { recursive: true });

  let entries: string[];
  try {
    entries = await readdir(root);
  } catch {
    return [];
  }

  const projects: PipelineProject[] = [];
  for (const entry of entries) {
    try {
      const raw = await readFile(join(root, entry, "project.json"), "utf-8");
      projects.push(JSON.parse(raw) as PipelineProject);
    } catch {
      // skip non-project directories
    }
  }

  return projects.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

// ── Duration formatting ──────────────────────────────────────────

export function formatDuration(startIso: string, endIso?: string): string {
  const start = new Date(startIso).getTime();
  const end = endIso ? new Date(endIso).getTime() : Date.now();
  const seconds = Math.floor((end - start) / 1000);
  if (seconds < 60) return `${seconds}s`;
  const minutes = Math.floor(seconds / 60);
  const remaining = seconds % 60;
  if (minutes < 60) return `${minutes}m ${remaining}s`;
  const hours = Math.floor(minutes / 60);
  return `${hours}h ${minutes % 60}m`;
}
