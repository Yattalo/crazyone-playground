// ── Component Metadata Schema ─────────────────────────

export type ComponentCategory = "ui" | "blocks" | "patterns";

export interface PropDef {
  name: string;
  type: string;
  default?: string;
  required: boolean;
  description: string;
}

export interface Example {
  title: string;
  code: string;
}

export interface ComponentMeta {
  name: string;
  slug: string;
  category: ComponentCategory;
  description: string;
  author: string;
  version: string;
  dependencies: string[];
  peerDependencies: string[];
  props: PropDef[];
  variants: string[];
  cssVariables: string[];
  tags: string[];
  examples: Example[];
  compatibility: {
    themes: string[];
    frameworks: string[];
  };
}

/** A component on disk (meta + paths). */
export interface Component {
  meta: ComponentMeta;
  /** Absolute path to the component directory. */
  dir: string;
  /** Absolute path to meta.json. */
  metaPath: string;
  /** All files in the directory. */
  files: string[];
}

// ── Registry ──────────────────────────────────────────

export interface RegistryEntry {
  slug: string;
  category: ComponentCategory;
  name: string;
  path: string;
}

export interface Registry {
  version: string;
  components: RegistryEntry[];
}

// ── Component Template ────────────────────────────────

export interface ComponentTemplate {
  id: string;
  title: string;
  description: string;
  category: ComponentCategory;
  tags: string[];
  defaultProps: PropDef[];
  defaultVariants: string[];
  defaultDependencies: string[];
  defaultCssVariables: string[];
  /** Template source code with {{PLACEHOLDERS}}. */
  sourceTemplate: string;
}
