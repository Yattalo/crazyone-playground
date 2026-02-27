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
import { buildSkillMd, skillsDir, toSlug } from "./utils";
import type { SkillFrontmatter, SkillScope } from "./types";

export default function CreateSkill() {
  const [nameError, setNameError] = useState<string | undefined>();

  async function handleSubmit(values: {
    name: string;
    description: string;
    scope: string;
    argumentHint: string;
    body: string;
    disableModelInvocation: boolean;
    userInvocable: boolean;
    allowedTools: string;
    model: string;
    context: string;
    agent: string;
  }) {
    const slug = toSlug(values.name);
    if (!slug) {
      setNameError("Name must contain at least one alphanumeric character");
      return;
    }

    const scope = values.scope as SkillScope;
    const dir = resolve(skillsDir(scope), slug);
    const filePath = resolve(dir, "SKILL.md");

    const fm: SkillFrontmatter = {
      name: slug,
      description: values.description,
    };

    if (values.argumentHint) fm["argument-hint"] = values.argumentHint;
    if (values.disableModelInvocation) fm["disable-model-invocation"] = true;
    if (!values.userInvocable) fm["user-invocable"] = false;
    if (values.allowedTools) fm["allowed-tools"] = values.allowedTools;
    if (values.model) fm.model = values.model;
    if (values.context === "fork") fm.context = "fork";
    if (values.agent && values.agent !== "none") fm.agent = values.agent as SkillFrontmatter["agent"];

    const content = buildSkillMd(fm, values.body || `Instructions for /${slug} go here.\n\n$ARGUMENTS`);

    try {
      await mkdir(dir, { recursive: true });
      await writeFile(filePath, content, "utf-8");

      await showToast({
        style: Toast.Style.Success,
        title: "Skill created",
        message: `/${slug} → ${filePath}`,
        primaryAction: {
          title: "Open in Editor",
          onAction: () => open(filePath),
        },
      });

      await showHUD(`✓ Skill /${slug} created`);
      await popToRoot();
    } catch (err) {
      await showToast({
        style: Toast.Style.Failure,
        title: "Failed to create skill",
        message: String(err),
      });
    }
  }

  return (
    <Form
      actions={
        <ActionPanel>
          <Action.SubmitForm title="Create Skill" onSubmit={handleSubmit} />
        </ActionPanel>
      }
    >
      <Form.TextField
        id="name"
        title="Skill Name"
        placeholder="my-skill"
        info="Used as the directory name and /slash-command. Will be converted to kebab-case."
        error={nameError}
        onChange={() => nameError && setNameError(undefined)}
      />

      <Form.TextField
        id="description"
        title="Description"
        placeholder="What this skill does — Claude uses this to decide when to auto-invoke"
      />

      <Form.Dropdown id="scope" title="Scope" defaultValue="project">
        <Form.Dropdown.Item value="project" title="Project (.claude/skills/)" />
        <Form.Dropdown.Item value="user" title="User (~/.claude/skills/)" />
      </Form.Dropdown>

      <Form.TextField
        id="argumentHint"
        title="Argument Hint"
        placeholder="[file-path]"
        info="Shown in autocomplete, e.g. [file-path] or [issue-number]"
      />

      <Form.TextArea
        id="body"
        title="Instructions"
        placeholder={`Write the markdown instructions Claude will follow.\nUse $ARGUMENTS for user input, $0 / $1 for positional args.`}
        enableMarkdown
      />

      <Form.Separator />

      <Form.Checkbox
        id="userInvocable"
        label="User can invoke with /command"
        defaultValue={true}
      />

      <Form.Checkbox
        id="disableModelInvocation"
        label="Disable auto-invocation by Claude"
        defaultValue={false}
        info="If checked, only the user can trigger this skill (not Claude automatically)"
      />

      <Form.TextField
        id="allowedTools"
        title="Allowed Tools"
        placeholder="Read, Grep, Glob, Bash"
        info="Comma-separated list of tools Claude can use. Leave empty for all tools."
      />

      <Form.Dropdown id="model" title="Model" defaultValue="">
        <Form.Dropdown.Item value="" title="Default (inherit)" />
        <Form.Dropdown.Item value="claude-opus-4-6" title="Opus 4.6" />
        <Form.Dropdown.Item value="claude-sonnet-4-6" title="Sonnet 4.6" />
        <Form.Dropdown.Item value="claude-haiku-4-5-20251001" title="Haiku 4.5" />
      </Form.Dropdown>

      <Form.Dropdown id="context" title="Context" defaultValue="">
        <Form.Dropdown.Item value="" title="Default (inline)" />
        <Form.Dropdown.Item value="fork" title="Fork (isolated subagent)" />
      </Form.Dropdown>

      <Form.Dropdown id="agent" title="Agent Type" defaultValue="none">
        <Form.Dropdown.Item value="none" title="None" />
        <Form.Dropdown.Item value="Explore" title="Explore" />
        <Form.Dropdown.Item value="Plan" title="Plan" />
        <Form.Dropdown.Item value="general-purpose" title="General Purpose" />
      </Form.Dropdown>
    </Form>
  );
}
