import { getPreferenceValues } from "@raycast/api";
import { resolve, basename } from "path";
import { readdir, readFile, writeFile, mkdir, stat } from "fs/promises";
import type {
  Component,
  ComponentMeta,
  ComponentCategory,
  PropDef,
  Registry,
  RegistryEntry,
} from "./types";

// ── Preferences ───────────────────────────────────────

interface Preferences {
  componentsRoot: string;
  author: string;
}

export function prefs(): Preferences {
  return getPreferenceValues<Preferences>();
}

/** Absolute path to the components root directory. */
export function componentsRoot(): string {
  const p = prefs().componentsRoot;
  // Support ~ for home dir
  if (p.startsWith("~")) return resolve(process.env.HOME ?? "/", p.slice(2));
  return resolve(p);
}

export function categoryDir(category: ComponentCategory): string {
  return resolve(componentsRoot(), category);
}

export function registryPath(): string {
  return resolve(componentsRoot(), "registry.json");
}

// ── Naming ────────────────────────────────────────────

export function toSlug(name: string): string {
  return name
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function toPascalCase(slug: string): string {
  return slug
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join("");
}

export function truncate(str: string, max: number): string {
  if (str.length <= max) return str;
  return str.slice(0, max - 3) + "...";
}

// ── Registry I/O ──────────────────────────────────────

export async function readRegistry(): Promise<Registry> {
  try {
    const raw = await readFile(registryPath(), "utf-8");
    return JSON.parse(raw);
  } catch {
    return { version: "1.0.0", components: [] };
  }
}

export async function writeRegistry(registry: Registry): Promise<void> {
  await mkdir(componentsRoot(), { recursive: true });
  await writeFile(registryPath(), JSON.stringify(registry, null, 2) + "\n", "utf-8");
}

export async function addToRegistry(entry: RegistryEntry): Promise<void> {
  const reg = await readRegistry();
  const idx = reg.components.findIndex((c) => c.slug === entry.slug && c.category === entry.category);
  if (idx >= 0) {
    reg.components[idx] = entry;
  } else {
    reg.components.push(entry);
  }
  reg.components.sort((a, b) => `${a.category}/${a.slug}`.localeCompare(`${b.category}/${b.slug}`));
  await writeRegistry(reg);
}

export async function removeFromRegistry(slug: string, category: ComponentCategory): Promise<void> {
  const reg = await readRegistry();
  reg.components = reg.components.filter((c) => !(c.slug === slug && c.category === category));
  await writeRegistry(reg);
}

// ── Meta I/O ──────────────────────────────────────────

export function defaultMeta(name: string, slug: string, category: ComponentCategory): ComponentMeta {
  return {
    name,
    slug,
    category,
    description: "",
    author: prefs().author || "crazyone",
    version: "0.1.0",
    dependencies: [],
    peerDependencies: ["react", "tailwindcss"],
    props: [],
    variants: [],
    cssVariables: [],
    tags: [],
    examples: [],
    compatibility: { themes: ["all"], frameworks: ["react", "next"] },
  };
}

export async function readMeta(dir: string): Promise<ComponentMeta | null> {
  try {
    const raw = await readFile(resolve(dir, "meta.json"), "utf-8");
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export async function writeMeta(dir: string, meta: ComponentMeta): Promise<void> {
  await writeFile(resolve(dir, "meta.json"), JSON.stringify(meta, null, 2) + "\n", "utf-8");
}

// ── Component Scanner ─────────────────────────────────

export async function scanComponents(): Promise<Component[]> {
  const root = componentsRoot();
  const categories: ComponentCategory[] = ["ui", "blocks", "patterns"];
  const all: Component[] = [];

  for (const cat of categories) {
    const dir = resolve(root, cat);
    let entries: string[];
    try {
      entries = await readdir(dir);
    } catch {
      continue;
    }

    for (const entry of entries) {
      const compDir = resolve(dir, entry);
      const s = await stat(compDir).catch(() => null);
      if (!s?.isDirectory()) continue;

      const meta = await readMeta(compDir);
      if (!meta) continue;

      const files = await readdir(compDir);
      all.push({
        meta,
        dir: compDir,
        metaPath: resolve(compDir, "meta.json"),
        files,
      });
    }
  }

  return all;
}

// ── Code Generators ───────────────────────────────────

export function generateComponentSource(meta: ComponentMeta): string {
  const pascal = toPascalCase(meta.slug);
  const propsInterface = meta.props.length > 0 ? generatePropsInterface(pascal, meta.props) : "";
  const propsArg = meta.props.length > 0 ? `{ ${meta.props.map((p) => p.name).join(", ")} }: ${pascal}Props` : "";
  const hasVariants = meta.variants.length > 0;
  const hasClassName = meta.props.some((p) => p.name === "className");

  let imports = `import { forwardRef } from "react";`;
  if (hasClassName) imports += `\nimport { cn } from "./cn";`;

  let variantBlock = "";
  if (hasVariants) {
    const variantProp = meta.props.find((p) => p.name === "variant");
    const defaultVariant = variantProp?.default?.replace(/"/g, "") || meta.variants[0];
    variantBlock = `\nconst variants: Record<string, string> = {\n${meta.variants.map((v) => `  ${v}: "",`).join("\n")}\n};\n`;
  }

  return `${imports}

${propsInterface}${variantBlock}
const ${pascal} = forwardRef<HTMLDivElement, ${meta.props.length > 0 ? `${pascal}Props` : "React.HTMLAttributes<HTMLDivElement>"}>(
  (${propsArg ? `${propsArg}, ref` : "props, ref"}) => {
    return (
      <div ref={ref}${hasClassName ? ` className={cn("", className)}` : ""}>
        {/* ${meta.name} */}${meta.props.some((p) => p.name === "children") ? "\n        {children}" : ""}
      </div>
    );
  }
);
${pascal}.displayName = "${pascal}";

export { ${pascal} };
export type { ${meta.props.length > 0 ? `${pascal}Props` : ""} };
`;
}

function generatePropsInterface(pascal: string, props: PropDef[]): string {
  const lines = props.map((p) => {
    const opt = p.required ? "" : "?";
    return `  ${p.name}${opt}: ${p.type};`;
  });
  return `interface ${pascal}Props {\n${lines.join("\n")}\n}\n`;
}

export function generateStory(meta: ComponentMeta): string {
  const pascal = toPascalCase(meta.slug);
  const variantArgType =
    meta.variants.length > 0
      ? `\n  argTypes: {\n    variant: {\n      control: "select",\n      options: ${JSON.stringify(meta.variants)},\n    },\n  },`
      : "";

  const exampleStory =
    meta.examples.length > 0
      ? meta.examples
          .map(
            (ex, i) =>
              `\nexport const ${ex.title.replace(/\s+/g, "")}: Story = {\n  render: () => (\n    ${ex.code}\n  ),\n};`
          )
          .join("\n")
      : "";

  return `import type { Meta, StoryObj } from "@storybook/react";
import { ${pascal} } from "./${meta.slug}";

const meta: Meta<typeof ${pascal}> = {
  title: "${meta.category === "ui" ? "UI" : meta.category === "blocks" ? "Blocks" : "Patterns"}/${pascal}",
  component: ${pascal},
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],${variantArgType}
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {${meta.props.filter((p) => p.default).map((p) => `\n    ${p.name}: ${p.default},`).join("")}
  },
};
${exampleStory}
`;
}

export function generateIndex(meta: ComponentMeta): string {
  const pascal = toPascalCase(meta.slug);
  const hasProps = meta.props.length > 0;
  return `export { ${pascal}${hasProps ? `, type ${pascal}Props` : ""} } from "./${meta.slug}";\n`;
}

export function generateImportSnippet(meta: ComponentMeta): string {
  const pascal = toPascalCase(meta.slug);
  return `import { ${pascal} } from "@/components/${meta.category}/${meta.slug}";`;
}

export function generateUsageSnippet(meta: ComponentMeta): string {
  const pascal = toPascalCase(meta.slug);
  const requiredProps = meta.props.filter((p) => p.required && p.name !== "children");
  const propsStr = requiredProps.map((p) => ` ${p.name}={${p.default || `""`}}`).join("");
  const hasChildren = meta.props.some((p) => p.name === "children");
  if (hasChildren) return `<${pascal}${propsStr}>Content</${pascal}>`;
  return `<${pascal}${propsStr} />`;
}

export function generatePropsMarkdown(meta: ComponentMeta): string {
  if (meta.props.length === 0) return "_No props defined._";
  const header = "| Prop | Type | Default | Required | Description |\n|------|------|---------|----------|-------------|";
  const rows = meta.props
    .map(
      (p) =>
        `| \`${p.name}\` | \`${p.type}\` | ${p.default ? `\`${p.default}\`` : "—"} | ${p.required ? "Yes" : "No"} | ${p.description} |`
    )
    .join("\n");
  return `${header}\n${rows}`;
}
