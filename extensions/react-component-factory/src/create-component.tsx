import {
  Form,
  ActionPanel,
  Action,
  showToast,
  Toast,
  open,
  popToRoot,
  showHUD,
} from "@raycast/api";
import { mkdir, writeFile } from "fs/promises";
import { resolve } from "path";
import { useState } from "react";
import {
  toSlug,
  toPascalCase,
  categoryDir,
  defaultMeta,
  writeMeta,
  addToRegistry,
  generateComponentSource,
  generateStory,
  generateIndex,
  prefs,
} from "./utils";
import type { ComponentCategory, PropDef } from "./types";

export default function CreateComponent() {
  const [nameError, setNameError] = useState<string>();
  const [propFields, setPropFields] = useState<PropDef[]>([]);

  async function handleSubmit(values: {
    name: string;
    category: string;
    description: string;
    tags: string;
    variants: string;
    dependencies: string;
    cssVariables: string;
    generateStory: boolean;
    // Dynamic prop fields (prop_name_0, prop_type_0, etc.)
    [key: string]: string | boolean;
  }) {
    const slug = toSlug(values.name);
    if (!slug) {
      setNameError("Name is required");
      return;
    }

    const category = values.category as ComponentCategory;
    const dir = resolve(categoryDir(category), slug);

    // Build props from dynamic fields
    const props: PropDef[] = [];
    for (let i = 0; i < propFields.length; i++) {
      const pName = values[`prop_name_${i}`] as string;
      const pType = values[`prop_type_${i}`] as string;
      if (!pName || !pType) continue;
      props.push({
        name: pName,
        type: pType,
        default: (values[`prop_default_${i}`] as string) || undefined,
        required: values[`prop_required_${i}`] === true,
        description: (values[`prop_desc_${i}`] as string) || "",
      });
    }

    const meta = defaultMeta(toPascalCase(slug), slug, category);
    meta.description = values.description || "";
    meta.author = prefs().author || "crazyone";
    meta.tags = values.tags
      ? values.tags.split(",").map((t) => t.trim()).filter(Boolean)
      : [];
    meta.variants = values.variants
      ? values.variants.split(",").map((v) => v.trim()).filter(Boolean)
      : [];
    meta.dependencies = values.dependencies
      ? values.dependencies.split(",").map((d) => d.trim()).filter(Boolean)
      : [];
    meta.cssVariables = values.cssVariables
      ? values.cssVariables.split(",").map((v) => v.trim()).filter(Boolean)
      : [];
    meta.props = props;

    // Add common props if not present
    if (!meta.props.find((p) => p.name === "className")) {
      meta.props.push({
        name: "className",
        type: "string",
        required: false,
        description: "Additional CSS classes",
      });
    }
    if (!meta.props.find((p) => p.name === "children")) {
      meta.props.push({
        name: "children",
        type: "React.ReactNode",
        required: false,
        description: "Child elements",
      });
    }

    // Add default example
    const pascal = toPascalCase(slug);
    meta.examples = [
      { title: "Default", code: `<${pascal}>Hello</${pascal}>` },
    ];
    if (meta.variants.length > 0) {
      meta.examples.push({
        title: "Variants",
        code: meta.variants
          .map((v) => `<${pascal} variant="${v}">${v}</${pascal}>`)
          .join("\n    "),
      });
    }

    try {
      await mkdir(dir, { recursive: true });

      // Write meta.json
      await writeMeta(dir, meta);

      // Write component source
      await writeFile(resolve(dir, `${slug}.tsx`), generateComponentSource(meta), "utf-8");

      // Write barrel export
      await writeFile(resolve(dir, "index.ts"), generateIndex(meta), "utf-8");

      // Write cn utility
      await writeFile(
        resolve(dir, "cn.ts"),
        `import { type ClassValue, clsx } from "clsx";\nimport { twMerge } from "tailwind-merge";\n\nexport function cn(...inputs: ClassValue[]) {\n  return twMerge(clsx(inputs));\n}\n`,
        "utf-8"
      );

      // Write story if requested
      if (values.generateStory) {
        await writeFile(resolve(dir, `${slug}.stories.tsx`), generateStory(meta), "utf-8");
      }

      // Update registry
      await addToRegistry({
        slug,
        category,
        name: meta.name,
        path: `${category}/${slug}`,
      });

      await showToast({
        style: Toast.Style.Success,
        title: `Component ${pascal} created`,
        message: dir,
        primaryAction: {
          title: "Open Component",
          onAction: () => open(resolve(dir, `${slug}.tsx`)),
        },
      });

      await showHUD(`✓ ${pascal} created in ${category}/`);
      await popToRoot();
    } catch (err) {
      await showToast({
        style: Toast.Style.Failure,
        title: "Failed to create component",
        message: String(err),
      });
    }
  }

  function addProp() {
    setPropFields([
      ...propFields,
      { name: "", type: "string", required: false, description: "" },
    ]);
  }

  function removeProp() {
    setPropFields(propFields.slice(0, -1));
  }

  return (
    <Form
      actions={
        <ActionPanel>
          <Action.SubmitForm title="Create Component" onSubmit={handleSubmit} />
          <Action title="Add Prop" onAction={addProp} shortcut={{ modifiers: ["cmd"], key: "n" }} />
          {propFields.length > 0 && (
            <Action
              title="Remove Last Prop"
              onAction={removeProp}
              shortcut={{ modifiers: ["cmd"], key: "backspace" }}
            />
          )}
        </ActionPanel>
      }
    >
      <Form.Description title="Component" text="Define your React component. Press ⌘N to add props." />

      <Form.TextField
        id="name"
        title="Name"
        placeholder="HeroSection"
        info="Component name (PascalCase or kebab-case — both work)"
        error={nameError}
        onChange={() => nameError && setNameError(undefined)}
      />

      <Form.Dropdown id="category" title="Category" defaultValue="ui">
        <Form.Dropdown.Item value="ui" title="UI — Primitives (Button, Input, Card...)" />
        <Form.Dropdown.Item value="blocks" title="Blocks — Composed (Hero, PricingCard, ContactForm...)" />
        <Form.Dropdown.Item value="patterns" title="Patterns — Layouts (Sidebar, Grid, Dashboard...)" />
      </Form.Dropdown>

      <Form.TextArea id="description" title="Description" placeholder="What this component does..." />

      <Form.TextField
        id="variants"
        title="Variants"
        placeholder="default, primary, secondary, destructive, ghost"
        info="Comma-separated visual variants"
      />

      <Form.TextField
        id="tags"
        title="Tags"
        placeholder="interactive, form, layout"
        info="Comma-separated tags for search and filtering"
      />

      <Form.TextField
        id="dependencies"
        title="Dependencies"
        placeholder="@radix-ui/react-slot, class-variance-authority"
        info="Comma-separated npm packages this component needs"
      />

      <Form.TextField
        id="cssVariables"
        title="CSS Variables"
        placeholder="--primary, --background, --border"
        info="Comma-separated CSS custom properties used"
      />

      <Form.Checkbox id="generateStory" label="Generate Storybook story" defaultValue={true} />

      {propFields.length > 0 && <Form.Separator />}
      {propFields.length > 0 && (
        <Form.Description title="Props" text={`${propFields.length} prop(s) defined. ⌘N to add, ⌘⌫ to remove.`} />
      )}

      {propFields.map((_, i) => (
        <>
          <Form.TextField key={`pn${i}`} id={`prop_name_${i}`} title={`Prop ${i + 1} — Name`} placeholder="variant" />
          <Form.TextField
            key={`pt${i}`}
            id={`prop_type_${i}`}
            title={`Prop ${i + 1} — Type`}
            placeholder={`"default" | "primary" | "secondary"`}
          />
          <Form.TextField
            key={`pd${i}`}
            id={`prop_default_${i}`}
            title={`Prop ${i + 1} — Default`}
            placeholder={`"default"`}
          />
          <Form.TextField
            key={`pe${i}`}
            id={`prop_desc_${i}`}
            title={`Prop ${i + 1} — Description`}
            placeholder="Visual style variant"
          />
          <Form.Checkbox key={`pr${i}`} id={`prop_required_${i}`} label={`Prop ${i + 1} — Required`} />
        </>
      ))}
    </Form>
  );
}
