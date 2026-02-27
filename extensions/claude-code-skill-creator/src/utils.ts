import { homedir } from "os";
import { resolve } from "path";
import { readdir, readFile, stat } from "fs/promises";
import type { Skill, SkillFrontmatter, SkillScope } from "./types";

// ── Paths ──────────────────────────────────────────────

/** ~/.claude/skills */
export function userSkillsDir(): string {
  return resolve(homedir(), ".claude", "skills");
}

/** <cwd>/.claude/skills */
export function projectSkillsDir(): string {
  return resolve(process.cwd(), ".claude", "skills");
}

export function skillsDir(scope: SkillScope): string {
  return scope === "user" ? userSkillsDir() : projectSkillsDir();
}

// ── YAML-lite serialiser (zero deps) ──────────────────

export function frontmatterToYaml(fm: SkillFrontmatter): string {
  const lines: string[] = [];
  lines.push(`name: ${fm.name}`);
  lines.push(`description: ${fm.description}`);
  if (fm["argument-hint"]) lines.push(`argument-hint: "${fm["argument-hint"]}"`);
  if (fm["disable-model-invocation"] !== undefined)
    lines.push(`disable-model-invocation: ${fm["disable-model-invocation"]}`);
  if (fm["user-invocable"] !== undefined) lines.push(`user-invocable: ${fm["user-invocable"]}`);
  if (fm["allowed-tools"]) lines.push(`allowed-tools: ${fm["allowed-tools"]}`);
  if (fm.model) lines.push(`model: ${fm.model}`);
  if (fm.context) lines.push(`context: ${fm.context}`);
  if (fm.agent) lines.push(`agent: ${fm.agent}`);
  return lines.join("\n");
}

export function buildSkillMd(fm: SkillFrontmatter, body: string): string {
  return `---\n${frontmatterToYaml(fm)}\n---\n\n${body}\n`;
}

// ── YAML-lite parser (zero deps) ──────────────────────

function parseFrontmatter(raw: string): { meta: Record<string, string>; body: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return { meta: {}, body: raw };
  const meta: Record<string, string> = {};
  for (const line of match[1].split("\n")) {
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    const val = line
      .slice(idx + 1)
      .trim()
      .replace(/^["']|["']$/g, "");
    meta[key] = val;
  }
  return { meta, body: match[2].trim() };
}

// ── Scanner ───────────────────────────────────────────

export async function scanSkills(scope: SkillScope): Promise<Skill[]> {
  const dir = skillsDir(scope);
  let entries: string[];
  try {
    entries = await readdir(dir);
  } catch {
    return [];
  }

  const skills: Skill[] = [];

  for (const entry of entries) {
    const skillDir = resolve(dir, entry);
    const s = await stat(skillDir);
    if (!s.isDirectory()) continue;

    const skillMdPath = resolve(skillDir, "SKILL.md");
    let raw: string;
    try {
      raw = await readFile(skillMdPath, "utf-8");
    } catch {
      continue;
    }

    const { meta, body } = parseFrontmatter(raw);

    const allFiles = await readdir(skillDir);
    const supportingFiles = allFiles.filter((f) => f !== "SKILL.md");

    skills.push({
      slug: entry,
      meta: {
        name: meta.name ?? entry,
        description: meta.description ?? "",
        "argument-hint": meta["argument-hint"],
        "disable-model-invocation": meta["disable-model-invocation"] === "true" ? true : undefined,
        "user-invocable": meta["user-invocable"] === "false" ? false : undefined,
        "allowed-tools": meta["allowed-tools"],
        model: meta.model,
        context: meta.context === "fork" ? "fork" : undefined,
        agent: meta.agent as SkillFrontmatter["agent"],
      },
      body,
      path: skillMdPath,
      scope,
      supportingFiles,
    });
  }

  return skills;
}

// ── Helpers ───────────────────────────────────────────

export function toSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength - 3) + "...";
}
