import {
  List,
  ActionPanel,
  Action,
  Detail,
  Icon,
  Color,
  showToast,
  Toast,
  Alert,
  confirmAlert,
  useNavigation,
} from "@raycast/api";
import { usePromise } from "@raycast/utils";
import { rm } from "fs/promises";
import { resolve } from "path";
import {
  scanComponents,
  truncate,
  generateImportSnippet,
  generateUsageSnippet,
  generatePropsMarkdown,
  toPascalCase,
  removeFromRegistry,
} from "./utils";
import type { Component, ComponentCategory } from "./types";

function categoryMeta(cat: ComponentCategory) {
  const map: Record<ComponentCategory, { icon: Icon; color: Color; label: string }> = {
    ui: { icon: Icon.CircleFilled, color: Color.Blue, label: "UI" },
    blocks: { icon: Icon.AppWindowGrid3x3, color: Color.Orange, label: "Blocks" },
    patterns: { icon: Icon.AppWindowSidebarLeft, color: Color.Purple, label: "Patterns" },
  };
  return map[cat];
}

function ComponentDetail({ component }: { component: Component }) {
  const m = component.meta;
  const pascal = toPascalCase(m.slug);

  const md = `# ${pascal}

> ${m.description || "_No description._"}

**Category**: ${m.category} | **Version**: ${m.version} | **Author**: ${m.author}

---

## Props

${generatePropsMarkdown(m)}

${m.variants.length > 0 ? `## Variants\n\n${m.variants.map((v) => `\`${v}\``).join(" · ")}\n` : ""}

## Import

\`\`\`tsx
${generateImportSnippet(m)}
\`\`\`

## Usage

\`\`\`tsx
${generateUsageSnippet(m)}
\`\`\`

${m.examples.length > 0 ? `## Examples\n\n${m.examples.map((ex) => `### ${ex.title}\n\`\`\`tsx\n${ex.code}\n\`\`\``).join("\n\n")}\n` : ""}

${m.dependencies.length > 0 ? `## Dependencies\n\n${m.dependencies.map((d) => `- \`${d}\``).join("\n")}\n` : ""}

${m.cssVariables.length > 0 ? `## CSS Variables\n\n${m.cssVariables.map((v) => `- \`${v}\``).join("\n")}\n` : ""}

${m.tags.length > 0 ? `## Tags\n\n${m.tags.map((t) => `\`${t}\``).join(" · ")}\n` : ""}

---

**Files**: ${component.files.join(", ")}
**Path**: \`${component.dir}\`
`;

  return (
    <Detail
      markdown={md}
      metadata={
        <Detail.Metadata>
          <Detail.Metadata.Label title="Name" text={pascal} />
          <Detail.Metadata.Label title="Slug" text={m.slug} />
          <Detail.Metadata.TagList title="Category">
            <Detail.Metadata.TagList.Item
              text={categoryMeta(m.category).label}
              color={categoryMeta(m.category).color}
            />
          </Detail.Metadata.TagList>
          <Detail.Metadata.Label title="Props" text={`${m.props.length}`} />
          <Detail.Metadata.Label title="Variants" text={`${m.variants.length}`} />
          <Detail.Metadata.Label title="Files" text={`${component.files.length}`} />
          <Detail.Metadata.Separator />
          <Detail.Metadata.Label
            title="Themes"
            text={m.compatibility.themes.join(", ")}
          />
          <Detail.Metadata.Label
            title="Frameworks"
            text={m.compatibility.frameworks.join(", ")}
          />
        </Detail.Metadata>
      }
      actions={
        <ActionPanel>
          <Action.Open title="Open Component" target={resolve(component.dir, `${m.slug}.tsx`)} />
          <Action.Open title="Open Meta" target={component.metaPath} />
          <Action.CopyToClipboard
            title="Copy Import"
            content={generateImportSnippet(m)}
            shortcut={{ modifiers: ["cmd"], key: "i" }}
          />
          <Action.CopyToClipboard
            title="Copy Usage"
            content={generateUsageSnippet(m)}
            shortcut={{ modifiers: ["cmd"], key: "u" }}
          />
        </ActionPanel>
      }
    />
  );
}

export default function ComponentLibrary() {
  const { data: components, isLoading, revalidate } = usePromise(scanComponents);
  const { push } = useNavigation();

  async function deleteComponent(comp: Component) {
    if (
      await confirmAlert({
        title: `Delete ${comp.meta.name}?`,
        message: `This will delete ${comp.dir}`,
        primaryAction: { title: "Delete", style: Alert.ActionStyle.Destructive },
      })
    ) {
      try {
        await rm(comp.dir, { recursive: true });
        await removeFromRegistry(comp.meta.slug, comp.meta.category);
        await showToast({ style: Toast.Style.Success, title: `Deleted ${comp.meta.name}` });
        revalidate();
      } catch (err) {
        await showToast({ style: Toast.Style.Failure, title: "Delete failed", message: String(err) });
      }
    }
  }

  const grouped: Record<ComponentCategory, Component[]> = { ui: [], blocks: [], patterns: [] };
  for (const c of components ?? []) {
    grouped[c.meta.category].push(c);
  }

  const isEmpty = (components ?? []).length === 0 && !isLoading;

  return (
    <List isLoading={isLoading} searchBarPlaceholder="Search components...">
      {isEmpty && (
        <List.EmptyView
          title="No components yet"
          description="Use 'Create Component' to add your first component"
          icon={Icon.PlusSquare}
        />
      )}

      {(["ui", "blocks", "patterns"] as ComponentCategory[]).map((cat) => {
        const items = grouped[cat];
        if (items.length === 0) return null;
        const cm = categoryMeta(cat);
        return (
          <List.Section key={cat} title={cm.label} subtitle={`${items.length} component(s)`}>
            {items.map((comp) => (
              <List.Item
                key={comp.meta.slug}
                title={comp.meta.name}
                subtitle={truncate(comp.meta.description, 50)}
                icon={{ source: cm.icon, tintColor: cm.color }}
                accessories={[
                  ...(comp.meta.variants.length > 0
                    ? [{ text: `${comp.meta.variants.length} variants` }]
                    : []),
                  { text: `${comp.meta.props.length} props` },
                  ...comp.meta.tags.slice(0, 2).map((t) => ({
                    tag: { value: t, color: Color.SecondaryText },
                  })),
                ]}
                actions={
                  <ActionPanel>
                    <Action
                      title="View Details"
                      icon={Icon.Eye}
                      onAction={() => push(<ComponentDetail component={comp} />)}
                    />
                    <Action.Open
                      title="Open Source"
                      target={resolve(comp.dir, `${comp.meta.slug}.tsx`)}
                    />
                    <Action.CopyToClipboard
                      title="Copy Import"
                      content={generateImportSnippet(comp.meta)}
                      shortcut={{ modifiers: ["cmd"], key: "i" }}
                    />
                    <Action.CopyToClipboard
                      title="Copy Usage"
                      content={generateUsageSnippet(comp.meta)}
                      shortcut={{ modifiers: ["cmd"], key: "u" }}
                    />
                    <Action
                      title="Delete"
                      icon={Icon.Trash}
                      style={Action.Style.Destructive}
                      shortcut={{ modifiers: ["cmd"], key: "backspace" }}
                      onAction={() => deleteComponent(comp)}
                    />
                    <Action
                      title="Reload"
                      icon={Icon.ArrowClockwise}
                      shortcut={{ modifiers: ["cmd"], key: "r" }}
                      onAction={revalidate}
                    />
                  </ActionPanel>
                }
              />
            ))}
          </List.Section>
        );
      })}
    </List>
  );
}
