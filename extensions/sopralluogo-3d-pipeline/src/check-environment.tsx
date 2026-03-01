import { Action, ActionPanel, Color, Icon, List, showToast, Toast } from "@raycast/api";
import { usePromise } from "@raycast/utils";
import { execFile } from "child_process";
import { promisify } from "util";
import type { EnvironmentCheck } from "./types";
import { pythonPath, ffmpegPath, tttlrmCheckpoint, vbvrModel } from "./utils";

const execFileAsync = promisify(execFile);

async function runCheck(name: string, cmd: string, args: string[], timeout = 10000): Promise<EnvironmentCheck> {
  try {
    const { stdout } = await execFileAsync(cmd, args, { timeout });
    const version = stdout.trim().split("\n")[0].slice(0, 100);
    return { name, command: `${cmd} ${args.join(" ")}`, ok: true, version };
  } catch (err) {
    return {
      name,
      command: `${cmd} ${args.join(" ")}`,
      ok: false,
      error: err instanceof Error ? err.message : String(err),
    };
  }
}

async function checkAll(): Promise<EnvironmentCheck[]> {
  const py = pythonPath();
  const ff = ffmpegPath();

  const checks = await Promise.all([
    runCheck("Python", py, ["--version"]),
    runCheck("PyTorch + MPS", py, ["-c", "import torch; print(f'torch {torch.__version__}, MPS: {torch.backends.mps.is_available()}')"]),
    runCheck("tttLRM", py, ["-c", "import tttlrm; print(f'tttLRM {getattr(tttlrm, \"__version__\", \"installed\")}')"]),
    runCheck("VBVR", py, ["-c", "import vbvr; print(f'VBVR {getattr(vbvr, \"__version__\", \"installed\")}')"]),
    runCheck("FFmpeg", ff, ["-version"]),
    runCheck("tttLRM Checkpoint", "/bin/test", ["-f", tttlrmCheckpoint()]),
    runCheck("VBVR Model Dir", "/bin/test", ["-d", vbvrModel()]),
  ]);

  // Memory check (macOS only)
  try {
    const { stdout } = await execFileAsync("memory_pressure", [], { timeout: 5000 });
    const match = stdout.match(/free percentage:\s*(\d+)%/);
    const free = match ? parseInt(match[1], 10) : 0;
    checks.push({
      name: "Memoria Sistema",
      command: "memory_pressure",
      ok: free > 20,
      version: `${free}% libera (${free > 20 ? "OK" : "Critica — chiudi app per liberare RAM"})`,
    });
  } catch {
    checks.push({
      name: "Memoria Sistema",
      command: "memory_pressure",
      ok: false,
      error: "Non disponibile (solo macOS)",
    });
  }

  return checks;
}

export default function CheckEnvironment() {
  const { data: checks, isLoading, revalidate } = usePromise(checkAll);

  const allOk = checks?.every((c) => c.ok) ?? false;
  const failCount = checks?.filter((c) => !c.ok).length ?? 0;

  return (
    <List isLoading={isLoading} searchBarPlaceholder="Cerca requisito...">
      <List.Section
        title="Prerequisiti Pipeline"
        subtitle={allOk ? "Tutto OK" : `${failCount} problemi`}
      >
        {checks?.map((check) => (
          <List.Item
            key={check.name}
            title={check.name}
            subtitle={check.ok ? check.version : check.error}
            icon={
              check.ok
                ? { source: Icon.CheckCircle, tintColor: Color.Green }
                : { source: Icon.XMarkCircle, tintColor: Color.Red }
            }
            accessories={[
              {
                tag: {
                  value: check.ok ? "OK" : "Mancante",
                  color: check.ok ? Color.Green : Color.Red,
                },
              },
            ]}
            actions={
              <ActionPanel>
                <Action.CopyToClipboard title="Copia Comando" content={check.command} />
                {check.error && <Action.CopyToClipboard title="Copia Errore" content={check.error} />}
                <Action title="Ricontrolla" icon={Icon.ArrowClockwise} onAction={revalidate} />
              </ActionPanel>
            }
          />
        ))}
      </List.Section>

      <List.Section title="Setup Rapido">
        <List.Item
          title="Guida Installazione Completa"
          subtitle="Apri README con istruzioni passo-passo"
          icon={Icon.Book}
          actions={
            <ActionPanel>
              <Action.CopyToClipboard
                title="Copia Comandi Setup"
                content={`# 1. Crea ambiente conda
conda create -n sopralluogo python=3.11
conda activate sopralluogo

# 2. Installa PyTorch con MPS
pip install torch torchvision --index-url https://download.pytorch.org/whl/cpu

# 3. Installa tttLRM
git clone https://github.com/cwchenwang/tttLRM.git
cd tttLRM && pip install -e .

# 4. Installa VBVR
git clone https://github.com/Video-Reason/VBVR-EvalKit.git
cd VBVR-EvalKit && pip install -e .

# 5. Installa ffmpeg
brew install ffmpeg`}
              />
              <Action title="Ricontrolla Tutto" icon={Icon.ArrowClockwise} onAction={revalidate} />
            </ActionPanel>
          }
        />
      </List.Section>
    </List>
  );
}
