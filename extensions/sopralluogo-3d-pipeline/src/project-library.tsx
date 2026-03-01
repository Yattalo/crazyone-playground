import {
  Action,
  ActionPanel,
  Alert,
  Color,
  confirmAlert,
  Icon,
  List,
  open,
  showToast,
  Toast,
} from "@raycast/api";
import { usePromise } from "@raycast/utils";
import { rm } from "fs/promises";
import type { PipelineProject } from "./types";
import { STATUS_ICONS, STAGE_LABELS } from "./types";
import { scanProjects, projectDir, formatDate, formatDuration, truncate } from "./utils";
import { runPipeline } from "./orchestrator";

function statusSection(status: string): string {
  switch (status) {
    case "done":
      return "Completati";
    case "failed":
      return "Falliti";
    default:
      return "In Corso";
  }
}

function statusColor(status: string): Color {
  switch (status) {
    case "done":
      return Color.Green;
    case "failed":
      return Color.Red;
    case "configured":
      return Color.SecondaryText;
    default:
      return Color.Blue;
  }
}

function currentStageName(project: PipelineProject): string {
  const running = project.stages.find((s) => s.status === "running");
  if (running) return STAGE_LABELS[running.stage];
  const lastDone = [...project.stages].reverse().find((s) => s.status === "done");
  if (lastDone) return `${STAGE_LABELS[lastDone.stage]} ✓`;
  return "In attesa";
}

export default function ProjectLibrary() {
  const { data: projects, isLoading, revalidate } = usePromise(scanProjects);

  // Group by status
  const running = projects?.filter((p) => !["done", "failed", "configured"].includes(p.status)) ?? [];
  const completed = projects?.filter((p) => p.status === "done") ?? [];
  const failed = projects?.filter((p) => p.status === "failed") ?? [];
  const configured = projects?.filter((p) => p.status === "configured") ?? [];

  async function handleDelete(project: PipelineProject) {
    const confirmed = await confirmAlert({
      title: `Elimina "${project.name}"?`,
      message: "Tutti i file del progetto verranno cancellati permanentemente.",
      primaryAction: { title: "Elimina", style: Alert.ActionStyle.Destructive },
    });
    if (!confirmed) return;

    try {
      await rm(projectDir(project.id), { recursive: true, force: true });
      await showToast({ style: Toast.Style.Success, title: "Progetto eliminato" });
      revalidate();
    } catch (err) {
      await showToast({
        style: Toast.Style.Failure,
        title: "Errore eliminazione",
        message: err instanceof Error ? err.message : String(err),
      });
    }
  }

  async function handleRelaunch(project: PipelineProject) {
    await showToast({
      style: Toast.Style.Animated,
      title: "Pipeline riavviata",
      message: project.name,
    });

    // Reset stages
    for (const stage of project.stages) {
      stage.status = "pending";
      stage.startedAt = undefined;
      stage.finishedAt = undefined;
      stage.outputPath = undefined;
      stage.logs = [];
    }
    project.status = "configured";
    project.error = undefined;

    runPipeline(project).catch(async (err) => {
      await showToast({
        style: Toast.Style.Failure,
        title: "Pipeline fallita",
        message: err instanceof Error ? err.message : String(err),
      });
    });

    revalidate();
  }

  function renderItem(project: PipelineProject) {
    const icon = STATUS_ICONS[project.status] ?? "⚙️";
    const accessories: List.Item.Accessory[] = [
      { tag: { value: project.config.renderResolution, color: Color.SecondaryText } },
      { tag: { value: currentStageName(project), color: statusColor(project.status) } },
    ];

    if (project.status === "done" && project.stages[0]?.startedAt) {
      const lastStage = [...project.stages].reverse().find((s) => s.finishedAt);
      if (lastStage?.finishedAt) {
        accessories.unshift({
          text: formatDuration(project.stages[0].startedAt!, lastStage.finishedAt),
        });
      }
    }

    return (
      <List.Item
        key={project.id}
        title={project.name}
        subtitle={formatDate(new Date(project.createdAt))}
        icon={icon}
        accessories={accessories}
        actions={
          <ActionPanel>
            <ActionPanel.Section>
              <Action title="Apri Cartella" icon={Icon.Folder} onAction={() => open(projectDir(project.id))} />
              {project.status === "done" &&
                project.stages.find((s) => s.stage === "composite")?.outputPath && (
                  <Action.Open
                    title="Apri Video Finale"
                    target={project.stages.find((s) => s.stage === "composite")!.outputPath!}
                  />
                )}
            </ActionPanel.Section>
            <ActionPanel.Section>
              <Action
                title="Rilancia Pipeline"
                icon={Icon.RotateAntiClockwise}
                onAction={() => handleRelaunch(project)}
              />
              <Action
                title="Elimina Progetto"
                icon={Icon.Trash}
                style={Action.Style.Destructive}
                onAction={() => handleDelete(project)}
                shortcut={{ modifiers: ["ctrl"], key: "x" }}
              />
            </ActionPanel.Section>
            <ActionPanel.Section>
              <Action title="Ricarica" icon={Icon.ArrowClockwise} onAction={revalidate} />
            </ActionPanel.Section>
          </ActionPanel>
        }
      />
    );
  }

  const isEmpty = !projects || projects.length === 0;

  return (
    <List isLoading={isLoading} searchBarPlaceholder="Cerca progetti...">
      {isEmpty && !isLoading && (
        <List.EmptyView
          title="Nessun progetto"
          description="Usa Launch Pipeline per creare il tuo primo sopralluogo 3D"
          icon={Icon.Building}
        />
      )}

      {running.length > 0 && (
        <List.Section title="In Corso" subtitle={`${running.length}`}>
          {running.map(renderItem)}
        </List.Section>
      )}

      {configured.length > 0 && (
        <List.Section title="Configurati" subtitle={`${configured.length}`}>
          {configured.map(renderItem)}
        </List.Section>
      )}

      {completed.length > 0 && (
        <List.Section title="Completati" subtitle={`${completed.length}`}>
          {completed.map(renderItem)}
        </List.Section>
      )}

      {failed.length > 0 && (
        <List.Section title="Falliti" subtitle={`${failed.length}`}>
          {failed.map(renderItem)}
        </List.Section>
      )}
    </List>
  );
}
