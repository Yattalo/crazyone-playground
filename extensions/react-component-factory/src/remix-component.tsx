import {
  List,
  Form,
  ActionPanel,
  Action,
  Icon,
  Color,
  showToast,
  Toast,
  showHUD,
  popToRoot,
  useNavigation,
  open,
} from "@raycast/api";
import { usePromise } from "@raycast/utils";
import { mkdir, writeFile, readFile } from "fs/promises";
import { resolve } from "path";
import {
  scanComponents,
  truncate,
  toSlug,
  toPascalCase,
  categoryDir,
  writeMeta,
  addToRegistry,
  generateStory,
  generateIndex,
} from "./utils";
import type { Component, ComponentCategory, ComponentMeta } from "./types";

function RemixForm({ source }: { source: Component }) {
  const m = source.meta;

  async function handleSubmit(values: {
    newName: string;
    category: string;
    description: string;
    addVariants: string;
    removeVariants: string;
    addTags: string;
    wrapperTag: string;
    wrapperClass: string;
    generateStory: boolean;
  }) {
    const newSlug = toSlug(values.newName || m.name);
    const newPascal = toPascalCase(newSlug);
    const category = values.category as ComponentCategory;
    const dir = resolve(categoryDir(category), newSlug);

    // Clone meta with modifications
    const newMeta: ComponentMeta = {
      ...structuredClone(m),
      name: newPascal,
      slug: newSlug,
      category,
      description: values.description || m.description,
      version: "0.1.0",
    };

    // Modify variants
    if (values.addVariants) {
      const add = values.addVariants.split(",").map((v) => v.trim()).filter(Boolean);
      newMeta.variants = [...new Set([...newMeta.variants, ...add])];
    }
    if (values.removeVariants) {
      const remove = new Set(values.removeVariants.split(",").map((v) => v.trim()));
      newMeta.variants = newMeta.variants.filter((v) => !remove.has(v));
    }

    // Modify tags
    if (values.addTags) {
      const add = values.addTags.split(",").map((t) => t.trim()).filter(Boolean);
      newMeta.tags = [...new Set([...newMeta.tags, ...add])];
    }

    // Read original source and transform
    let sourceCode: string;
    try {
      sourceCode = await readFile(resolve(source.dir, `${m.slug}.tsx`), "utf-8");
    } catch {
      sourceCode = `// Remixed from ${m.name}\nimport { forwardRef } from "react";\n\nconst ${newPascal} = forwardRef<HTMLDivElement>((props, ref) => {\n  return <div ref={ref} {...props} />;\n});\n${newPascal}.displayName = "${newPascal}";\n\nexport { ${newPascal} };\n`;
    }

    // Rename component in source
    const origPascal = toPascalCase(m.slug);
    sourceCode = sourceCode.replace(new RegExp(origPascal, "g"), newPascal);
    sourceCode = sourceCode.replace(
      new RegExp(`${origPascal}Props`, "g"),
      `${newPascal}Props`
    );

    // Add wrapper if specified
    if (values.wrapperTag) {
      const cls = values.wrapperClass ? ` className="${values.wrapperClass}"` : "";
      sourceCode = `// Remixed from: ${m.category}/${m.slug}\n// Wrapped with <${values.wrapperTag}>\n\n${sourceCode}`;
    } else {
      sourceCode = `// Remixed from: ${m.category}/${m.slug}\n\n${sourceCode}`;
    }

    try {
      await mkdir(dir, { recursive: true });

      await writeMeta(dir, newMeta);
      await writeFile(resolve(dir, `${newSlug}.tsx`), sourceCode, "utf-8");
      await writeFile(resolve(dir, "index.ts"), generateIndex(newMeta), "utf-8");

      // Copy cn.ts if it exists in source
      try {
        const cn = await readFile(resolve(source.dir, "cn.ts"), "utf-8");
        await writeFile(resolve(dir, "cn.ts"), cn, "utf-8");
      } catch {
        // No cn.ts in source, skip
      }

      if (values.generateStory) {
        await writeFile(resolve(dir, `${newSlug}.stories.tsx`), generateStory(newMeta), "utf-8");
      }

      await addToRegistry({
        slug: newSlug,
        category,
        name: newPascal,
        path: `${category}/${newSlug}`,
      });

      await showToast({
        style: Toast.Style.Success,
        title: `Remixed → ${newPascal}`,
        message: dir,
        primaryAction: {
          title: "Open",
          onAction: () => open(resolve(dir, `${newSlug}.tsx`)),
        },
      });

      await showHUD(`✓ ${newPascal} remixed from ${m.name}`);
      await popToRoot();
    } catch (err) {
      await showToast({ style: Toast.Style.Failure, title: "Remix failed", message: String(err) });
    }
  }

  return (
    <Form
      navigationTitle={`Remix ${m.name}`}
      actions={
        <ActionPanel>
          <Action.SubmitForm title="Create Remix" onSubmit={handleSubmit} />
        </ActionPanel>
      }
    >
      <Form.Description
        title="Remixing"
        text={`Base: ${m.name} (${m.category}/${m.slug}) — ${m.props.length} props, ${m.variants.length} variants`}
      />

      <Form.TextField id="newName" title="New Name" placeholder={`${m.name}Custom`} />

      <Form.Dropdown id="category" title="Category" defaultValue={m.category}>
        <Form.Dropdown.Item value="ui" title="UI" />
        <Form.Dropdown.Item value="blocks" title="Blocks" />
        <Form.Dropdown.Item value="patterns" title="Patterns" />
      </Form.Dropdown>

      <Form.TextArea
        id="description"
        title="Description"
        defaultValue={m.description}
        placeholder="What makes this remix different..."
      />

      <Form.Separator />
      <Form.Description title="Variants" text={`Current: ${m.variants.join(", ") || "none"}`} />

      <Form.TextField
        id="addVariants"
        title="Add Variants"
        placeholder="highlight, compact"
        info="Comma-separated new variants to add"
      />

      <Form.TextField
        id="removeVariants"
        title="Remove Variants"
        placeholder="ghost, link"
        info="Comma-separated variants to remove"
      />

      <Form.Separator />

      <Form.TextField
        id="addTags"
        title="Add Tags"
        placeholder="marketing, landing"
        info="Comma-separated tags"
      />

      <Form.TextField
        id="wrapperTag"
        title="Wrapper Element"
        placeholder="section"
        info="Wrap component in this HTML element (optional)"
      />

      <Form.TextField
        id="wrapperClass"
        title="Wrapper Classes"
        placeholder="max-w-7xl mx-auto px-4"
        info="Tailwind classes for wrapper"
      />

      <Form.Checkbox id="generateStory" label="Generate Storybook story" defaultValue={true} />
    </Form>
  );
}

export default function RemixComponent() {
  const { data: components, isLoading } = usePromise(scanComponents);
  const { push } = useNavigation();

  const isEmpty = (components ?? []).length === 0 && !isLoading;

  return (
    <List isLoading={isLoading} searchBarPlaceholder="Select a component to remix...">
      {isEmpty && (
        <List.EmptyView
          title="No components to remix"
          description="Create components first using 'Create Component'"
          icon={Icon.Shuffle}
        />
      )}

      {(components ?? []).map((comp) => (
        <List.Item
          key={`${comp.meta.category}-${comp.meta.slug}`}
          title={comp.meta.name}
          subtitle={truncate(comp.meta.description, 50)}
          icon={Icon.Shuffle}
          accessories={[
            {
              tag: {
                value: comp.meta.category,
                color:
                  comp.meta.category === "ui"
                    ? Color.Blue
                    : comp.meta.category === "blocks"
                      ? Color.Orange
                      : Color.Purple,
              },
            },
            { text: `${comp.meta.variants.length} variants` },
            { text: `${comp.meta.props.length} props` },
          ]}
          actions={
            <ActionPanel>
              <Action
                title="Remix This Component"
                icon={Icon.Shuffle}
                onAction={() => push(<RemixForm source={comp} />)}
              />
            </ActionPanel>
          }
        />
      ))}
    </List>
  );
}
