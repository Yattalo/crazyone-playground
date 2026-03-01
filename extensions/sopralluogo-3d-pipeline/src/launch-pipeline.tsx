import { Action, ActionPanel, Form, showToast, Toast, open, LaunchType, launchCommand } from "@raycast/api";
import { useState } from "react";
import type { PipelineConfig, PipelineProject, StageResult } from "./types";
import { STAGE_ORDER } from "./types";
import { sanitizeInput, toSlug, generateId, writeProject, projectDir, maxMemoryGB } from "./utils";
import { runPipeline } from "./orchestrator";

export default function LaunchPipeline() {
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(values: {
    name: string;
    inputVideoPath: string[];
    poseDataPath: string[];
    vbvrPrompt: string;
    cameraTrajectory: string;
    renderResolution: string;
    chunkFrames: string;
    quantization: string;
    cpuOffload: boolean;
    numViews: string;
    autoChunkReduction: boolean;
  }) {
    const name = sanitizeInput(values.name);
    if (!name) {
      await showToast({ style: Toast.Style.Failure, title: "Nome progetto obbligatorio" });
      return;
    }

    const videoFiles = values.inputVideoPath;
    if (!videoFiles || videoFiles.length === 0) {
      await showToast({ style: Toast.Style.Failure, title: "Seleziona un video di sopralluogo" });
      return;
    }

    const prompt = sanitizeInput(values.vbvrPrompt);
    if (!prompt) {
      await showToast({ style: Toast.Style.Failure, title: "Inserisci un prompt per le infografiche VBVR" });
      return;
    }

    setIsLoading(true);

    try {
      const id = `${toSlug(name)}-${generateId()}`;

      const config: PipelineConfig = {
        numViews: parseInt(values.numViews, 10) || 16,
        maxSpatialMemoryGB: Math.min(maxMemoryGB() - 4, 20),
        renderResolution: values.renderResolution,
        renderFps: 30,
        cameraTrajectory: values.cameraTrajectory as PipelineConfig["cameraTrajectory"],
        vbvrPrompt: prompt,
        chunkFrames: parseInt(values.chunkFrames, 10) || 16,
        quantization: values.quantization as PipelineConfig["quantization"],
        cpuOffload: values.cpuOffload,
        maxMemoryGB: maxMemoryGB(),
        autoChunkReduction: values.autoChunkReduction,
      };

      const stages: StageResult[] = STAGE_ORDER.map((stage) => ({
        stage,
        status: "pending" as const,
        logs: [],
      }));

      const project: PipelineProject = {
        id,
        name,
        status: "configured",
        inputVideoPath: videoFiles[0],
        poseDataPath: values.poseDataPath?.[0] || undefined,
        outputDir: projectDir(id),
        config,
        stages,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      await writeProject(project);

      await showToast({
        style: Toast.Style.Animated,
        title: "Pipeline avviata",
        message: `Progetto: ${name}`,
      });

      // Launch pipeline in background (non-blocking)
      runPipeline(project).catch(async (err) => {
        await showToast({
          style: Toast.Style.Failure,
          title: "Pipeline fallita",
          message: err instanceof Error ? err.message : String(err),
        });
      });

      // Navigate to pipeline monitor
      try {
        await launchCommand({ name: "pipeline-monitor", type: LaunchType.UserInitiated });
      } catch {
        await open(projectDir(id));
      }
    } catch (err) {
      await showToast({
        style: Toast.Style.Failure,
        title: "Errore creazione progetto",
        message: err instanceof Error ? err.message : String(err),
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form
      isLoading={isLoading}
      actions={
        <ActionPanel>
          <Action.SubmitForm title="Avvia Pipeline" onSubmit={handleSubmit} />
        </ActionPanel>
      }
    >
      <Form.Description text="Configura e lancia la pipeline sopralluogo → 3D → infografica" />

      <Form.Separator />
      <Form.TextField id="name" title="Nome Progetto" placeholder="Sopralluogo Via Roma 12" />
      <Form.FilePicker id="inputVideoPath" title="Video Sopralluogo" allowMultipleSelection={false} />
      <Form.FilePicker
        id="poseDataPath"
        title="Dati Pose ARKit"
        allowMultipleSelection={false}
        info="Opzionale: metadati camera da Scaniverse, Polycam o ARKit. Evita il calcolo COLMAP."
      />

      <Form.Separator />
      <Form.Description text="Modulo Spaziale — tttLRM" />
      <Form.Dropdown id="numViews" title="Numero Viste" defaultValue="16">
        <Form.Dropdown.Item value="4" title="4 (veloce, qualità bassa)" />
        <Form.Dropdown.Item value="8" title="8 (bilanciato)" />
        <Form.Dropdown.Item value="16" title="16 (consigliato)" />
        <Form.Dropdown.Item value="32" title="32 (massima qualità)" />
      </Form.Dropdown>

      <Form.Separator />
      <Form.Description text="Modulo Render — 3D Gaussian Splatting" />
      <Form.Dropdown id="cameraTrajectory" title="Traiettoria Camera" defaultValue="orbit">
        <Form.Dropdown.Item value="orbit" title="Orbita (giro completo)" />
        <Form.Dropdown.Item value="flythrough" title="Flythrough (percorso lineare)" />
        <Form.Dropdown.Item value="custom" title="Custom (da file)" />
      </Form.Dropdown>
      <Form.Dropdown id="renderResolution" title="Risoluzione" defaultValue="1920x1080">
        <Form.Dropdown.Item value="1920x1080" title="1080p (Full HD)" />
        <Form.Dropdown.Item value="1280x720" title="720p (HD)" />
      </Form.Dropdown>

      <Form.Separator />
      <Form.Description text="Modulo Ragionamento — VBVR" />
      <Form.TextArea
        id="vbvrPrompt"
        title="Prompt Infografica"
        placeholder="Evidenzia il flusso d'aria dal condizionatore in blu. Traccia una linea di navigazione a nodi rossi per il tour."
        info="Istruzioni per Video-Reason su cosa sovrapporre al tour 3D"
      />
      <Form.Dropdown id="chunkFrames" title="Frame per Chunk" defaultValue="16">
        <Form.Dropdown.Item value="16" title="16 (sicuro per 32GB)" />
        <Form.Dropdown.Item value="24" title="24 (bilanciato)" />
        <Form.Dropdown.Item value="32" title="32 (rischio OOM)" />
      </Form.Dropdown>
      <Form.Dropdown id="quantization" title="Quantizzazione" defaultValue="8bit">
        <Form.Dropdown.Item value="8bit" title="8-bit (consigliato)" />
        <Form.Dropdown.Item value="4bit" title="4-bit (risparmia RAM)" />
      </Form.Dropdown>
      <Form.Checkbox id="cpuOffload" title="CPU Offload" label="Scarica layer su CPU durante inferenza" defaultValue={true} />

      <Form.Separator />
      <Form.Description text="Orchestratore" />
      <Form.Checkbox
        id="autoChunkReduction"
        title="Chunk Adattivo"
        label="Dimezza automaticamente i chunk se la pressione memoria supera l'80%"
        defaultValue={true}
      />
    </Form>
  );
}
