import {
  List,
  ActionPanel,
  Action,
  Icon,
  Color,
  showToast,
  Toast,
  Alert,
  confirmAlert,
} from "@raycast/api";
import { usePromise } from "@raycast/utils";
import { rm } from "fs/promises";
import { dirname } from "path";
import { scanSkills, truncate, userSkillsDir, projectSkillsDir } from "./utils";
import type { Skill } from "./types";

export default function ListSkills() {
  const {
    data: userSkills,
    isLoading: loadingUser,
    revalidate: reloadUser,
  } = usePromise(() => scanSkills("user"));

  const {
    data: projectSkills,
    isLoading: loadingProject,
    revalidate: reloadProject,
  } = usePromise(() => scanSkills("project"));

  const reload = () => {
    reloadUser();
    reloadProject();
  };

  const isLoading = loadingUser || loadingProject;

  async function deleteSkill(skill: Skill) {
    if (
      await confirmAlert({
        title: `Delete /${skill.slug}?`,
        message: `This will delete the entire ${skill.slug}/ directory.\n${skill.path}`,
        primaryAction: { title: "Delete", style: Alert.ActionStyle.Destructive },
      })
    ) {
      try {
        await rm(dirname(skill.path), { recursive: true });
        await showToast({ style: Toast.Style.Success, title: `Deleted /${skill.slug}` });
        reload();
      } catch (err) {
        await showToast({ style: Toast.Style.Failure, title: "Delete failed", message: String(err) });
      }
    }
  }

  function renderItem(skill: Skill) {
    const accessories: List.Item.Accessory[] = [];

    if (skill.meta["argument-hint"]) {
      accessories.push({ text: skill.meta["argument-hint"] });
    }
    if (skill.meta.context === "fork") {
      accessories.push({ tag: { value: "fork", color: Color.Purple } });
    }
    if (skill.meta.model) {
      accessories.push({ tag: { value: skill.meta.model.replace("claude-", ""), color: Color.Blue } });
    }
    if (skill.supportingFiles.length > 0) {
      accessories.push({ text: `+${skill.supportingFiles.length} files` });
    }

    return (
      <List.Item
        key={`${skill.scope}-${skill.slug}`}
        title={`/${skill.slug}`}
        subtitle={truncate(skill.meta.description, 60)}
        icon={skill.scope === "user" ? Icon.Person : Icon.Document}
        accessories={accessories}
        actions={
          <ActionPanel>
            <Action.Open title="Open SKILL.md" target={skill.path} />
            <Action.CopyToClipboard
              title="Copy Slash Command"
              content={`/${skill.slug}`}
              shortcut={{ modifiers: ["cmd"], key: "c" }}
            />
            <Action.CopyToClipboard
              title="Copy File Path"
              content={skill.path}
              shortcut={{ modifiers: ["cmd", "shift"], key: "c" }}
            />
            <Action
              title="Delete Skill"
              icon={Icon.Trash}
              style={Action.Style.Destructive}
              shortcut={{ modifiers: ["cmd"], key: "backspace" }}
              onAction={() => deleteSkill(skill)}
            />
            <Action
              title="Reload"
              icon={Icon.ArrowClockwise}
              shortcut={{ modifiers: ["cmd"], key: "r" }}
              onAction={reload}
            />
          </ActionPanel>
        }
      />
    );
  }

  const hasUser = (userSkills ?? []).length > 0;
  const hasProject = (projectSkills ?? []).length > 0;
  const isEmpty = !hasUser && !hasProject && !isLoading;

  return (
    <List isLoading={isLoading} searchBarPlaceholder="Search skills...">
      {isEmpty && (
        <List.EmptyView
          title="No skills found"
          description={`Looked in:\n• ${userSkillsDir()}\n• ${projectSkillsDir()}`}
          icon={Icon.MagnifyingGlass}
        />
      )}

      {hasProject && (
        <List.Section title="Project Skills" subtitle={projectSkillsDir()}>
          {(projectSkills ?? []).map(renderItem)}
        </List.Section>
      )}

      {hasUser && (
        <List.Section title="User Skills" subtitle={userSkillsDir()}>
          {(userSkills ?? []).map(renderItem)}
        </List.Section>
      )}
    </List>
  );
}
