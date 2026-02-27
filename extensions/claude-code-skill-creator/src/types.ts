/** Scope where a skill can be stored. */
export type SkillScope = "project" | "user";

/** Frontmatter fields for a SKILL.md file. */
export interface SkillFrontmatter {
  name: string;
  description: string;
  "argument-hint"?: string;
  "disable-model-invocation"?: boolean;
  "user-invocable"?: boolean;
  "allowed-tools"?: string;
  model?: string;
  context?: "fork";
  agent?: "Explore" | "Plan" | "general-purpose";
}

/** A fully parsed skill. */
export interface Skill {
  /** Slug / directory name. */
  slug: string;
  /** Parsed frontmatter. */
  meta: SkillFrontmatter;
  /** Markdown body (instructions). */
  body: string;
  /** Absolute path to the SKILL.md file. */
  path: string;
  /** Where this skill lives. */
  scope: SkillScope;
  /** Supporting files found alongside SKILL.md. */
  supportingFiles: string[];
}

/** A curated template the user can pick from. */
export interface SkillTemplate {
  id: string;
  title: string;
  description: string;
  ecosystem: "CrazyOne" | "SBedil" | "General";
  frontmatter: SkillFrontmatter;
  body: string;
}
