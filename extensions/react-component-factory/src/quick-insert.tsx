import {
  List,
  ActionPanel,
  Action,
  Icon,
  Color,
  Clipboard,
  showHUD,
} from "@raycast/api";
import { usePromise } from "@raycast/utils";
import { readFile } from "fs/promises";
import { resolve } from "path";
import {
  scanComponents,
  truncate,
  generateImportSnippet,
  generateUsageSnippet,
  generatePropsMarkdown,
  toPascalCase,
} from "./utils";
import type { Component, ComponentCategory } from "./types";

export default function QuickInsert() {
  const { data: components, isLoading } = usePromise(scanComponents);

  async function copySource(comp: Component) {
    try {
      const src = await readFile(resolve(comp.dir, `${comp.meta.slug}.tsx`), "utf-8");
      await Clipboard.copy(src);
      await showHUD(`✓ ${comp.meta.name} source copied`);
    } catch {
      await showHUD(`✗ Could not read source file`);
    }
  }

  async function copyFullSnippet(comp: Component) {
    const m = comp.meta;
    const snippet = `${generateImportSnippet(m)}\n\n// Usage:\n${generateUsageSnippet(m)}`;
    await Clipboard.copy(snippet);
    await showHUD(`✓ ${m.name} import + usage copied`);
  }

  async function pasteImport(comp: Component) {
    await Clipboard.paste(generateImportSnippet(comp.meta));
    await showHUD(`✓ ${comp.meta.name} import pasted`);
  }

  async function pasteUsage(comp: Component) {
    await Clipboard.paste(generateUsageSnippet(comp.meta));
    await showHUD(`✓ ${comp.meta.name} usage pasted`);
  }

  function catColor(cat: ComponentCategory): Color {
    return cat === "ui" ? Color.Blue : cat === "blocks" ? Color.Orange : Color.Purple;
  }

  const isEmpty = (components ?? []).length === 0 && !isLoading;

  return (
    <List isLoading={isLoading} searchBarPlaceholder="Quick insert component...">
      {isEmpty && (
        <List.EmptyView
          title="No components"
          description="Create components first"
          icon={Icon.PlusSquare}
        />
      )}

      {(components ?? []).map((comp) => {
        const m = comp.meta;
        const pascal = toPascalCase(m.slug);
        return (
          <List.Item
            key={`${m.category}-${m.slug}`}
            title={pascal}
            subtitle={truncate(m.description, 40)}
            icon={{ source: Icon.Code, tintColor: catColor(m.category) }}
            accessories={[
              { tag: { value: m.category, color: catColor(m.category) } },
              ...m.tags.slice(0, 1).map((t) => ({
                tag: { value: t, color: Color.SecondaryText },
              })),
            ]}
            actions={
              <ActionPanel>
                <ActionPanel.Section title="Paste">
                  <Action
                    title="Paste Import"
                    icon={Icon.Download}
                    onAction={() => pasteImport(comp)}
                  />
                  <Action
                    title="Paste Usage"
                    icon={Icon.Code}
                    onAction={() => pasteUsage(comp)}
                    shortcut={{ modifiers: ["cmd"], key: "u" }}
                  />
                </ActionPanel.Section>
                <ActionPanel.Section title="Copy">
                  <Action
                    title="Copy Import + Usage"
                    icon={Icon.Clipboard}
                    onAction={() => copyFullSnippet(comp)}
                    shortcut={{ modifiers: ["cmd"], key: "c" }}
                  />
                  <Action
                    title="Copy Full Source"
                    icon={Icon.Document}
                    onAction={() => copySource(comp)}
                    shortcut={{ modifiers: ["cmd", "shift"], key: "c" }}
                  />
                  <Action.CopyToClipboard
                    title="Copy Props Markdown"
                    content={generatePropsMarkdown(m)}
                    shortcut={{ modifiers: ["cmd"], key: "p" }}
                  />
                </ActionPanel.Section>
                <ActionPanel.Section title="Open">
                  <Action.Open
                    title="Open Source"
                    target={resolve(comp.dir, `${m.slug}.tsx`)}
                    shortcut={{ modifiers: ["cmd"], key: "o" }}
                  />
                  <Action.Open title="Open Meta" target={comp.metaPath} />
                </ActionPanel.Section>
              </ActionPanel>
            }
          />
        );
      })}
    </List>
  );
}
