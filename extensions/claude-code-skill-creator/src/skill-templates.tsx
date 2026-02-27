import {
  List,
  ActionPanel,
  Action,
  Icon,
  Color,
  showToast,
  Toast,
  showHUD,
} from "@raycast/api";
import { mkdir, writeFile } from "fs/promises";
import { resolve } from "path";
import { useState } from "react";
import { buildSkillMd, skillsDir } from "./utils";
import { SKILL_TEMPLATES } from "./templates";
import type { SkillScope, SkillTemplate } from "./types";

export default function SkillTemplates() {
  const [scope, setScope] = useState<SkillScope>("project");

  async function applyTemplate(template: SkillTemplate) {
    const dir = resolve(skillsDir(scope), template.frontmatter.name);
    const filePath = resolve(dir, "SKILL.md");
    const content = buildSkillMd(template.frontmatter, template.body);

    try {
      await mkdir(dir, { recursive: true });
      await writeFile(filePath, content, "utf-8");
      await showToast({
        style: Toast.Style.Success,
        title: "Skill created from template",
        message: `/${template.frontmatter.name} → ${filePath}`,
        primaryAction: {
          title: "Open in Editor",
          onAction: () => {
            const { open } = require("@raycast/api");
            open(filePath);
          },
        },
      });
      await showHUD(`✓ /${template.frontmatter.name} created`);
    } catch (err) {
      await showToast({
        style: Toast.Style.Failure,
        title: "Failed to create skill",
        message: String(err),
      });
    }
  }

  function ecosystemColor(eco: string): Color {
    if (eco === "CrazyOne") return Color.Orange;
    if (eco === "SBedil") return Color.Green;
    return Color.Blue;
  }

  function ecosystemIcon(eco: string): Icon {
    if (eco === "CrazyOne") return Icon.Megaphone;
    if (eco === "SBedil") return Icon.Hammer;
    return Icon.Code;
  }

  const grouped = {
    General: SKILL_TEMPLATES.filter((t) => t.ecosystem === "General"),
    CrazyOne: SKILL_TEMPLATES.filter((t) => t.ecosystem === "CrazyOne"),
    SBedil: SKILL_TEMPLATES.filter((t) => t.ecosystem === "SBedil"),
  };

  function renderTemplate(template: SkillTemplate) {
    return (
      <List.Item
        key={template.id}
        title={template.title}
        subtitle={`/${template.frontmatter.name}`}
        icon={{ source: ecosystemIcon(template.ecosystem), tintColor: ecosystemColor(template.ecosystem) }}
        accessories={[
          { tag: { value: template.ecosystem, color: ecosystemColor(template.ecosystem) } },
          ...(template.frontmatter["argument-hint"]
            ? [{ text: template.frontmatter["argument-hint"] }]
            : []),
        ]}
        actions={
          <ActionPanel>
            <Action
              title={`Create /${template.frontmatter.name}`}
              icon={Icon.Plus}
              onAction={() => applyTemplate(template)}
            />
            <Action.CopyToClipboard
              title="Copy SKILL.md Content"
              content={buildSkillMd(template.frontmatter, template.body)}
              shortcut={{ modifiers: ["cmd"], key: "c" }}
            />
            <ActionPanel.Section title="Scope">
              <Action
                title="Switch to Project Scope"
                icon={Icon.Document}
                onAction={() => setScope("project")}
              />
              <Action
                title="Switch to User Scope"
                icon={Icon.Person}
                onAction={() => setScope("user")}
              />
            </ActionPanel.Section>
          </ActionPanel>
        }
      />
    );
  }

  return (
    <List
      searchBarPlaceholder="Search templates..."
      searchBarAccessory={
        <List.Dropdown
          tooltip="Scope"
          value={scope}
          onChange={(v) => setScope(v as SkillScope)}
        >
          <List.Dropdown.Item title="Project (.claude/skills/)" value="project" />
          <List.Dropdown.Item title="User (~/.claude/skills/)" value="user" />
        </List.Dropdown>
      }
    >
      {Object.entries(grouped).map(
        ([eco, templates]) =>
          templates.length > 0 && (
            <List.Section key={eco} title={eco} subtitle={`${templates.length} templates`}>
              {templates.map(renderTemplate)}
            </List.Section>
          ),
      )}
    </List>
  );
}
