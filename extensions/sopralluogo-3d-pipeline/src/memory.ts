import { execFile } from "child_process";
import { promisify } from "util";
import { pythonPath } from "./utils";

const execFileAsync = promisify(execFile);

/**
 * Get macOS memory pressure as a percentage (0 = free, 100 = critical).
 * Falls back to 0 on non-macOS or if the command fails.
 */
export async function getMemoryPressure(): Promise<number> {
  try {
    const { stdout } = await execFileAsync("memory_pressure", [], { timeout: 5000 });
    // Parses: "System-wide memory free percentage: 42%"
    const match = stdout.match(/free percentage:\s*(\d+)%/);
    if (match) {
      // memory_pressure reports FREE %, we want USED %
      return 100 - parseInt(match[1], 10);
    }
    return 0;
  } catch {
    // Not macOS or command not available — return 0 (unknown)
    return 0;
  }
}

/**
 * Get memory pressure as a human-readable label and color.
 */
export function memoryLabel(pressure: number): { text: string; color: string } {
  if (pressure < 50) return { text: `${pressure}% — Normal`, color: "#30D158" };
  if (pressure < 75) return { text: `${pressure}% — Warning`, color: "#FFD60A" };
  return { text: `${pressure}% — Critical`, color: "#FF453A" };
}

/**
 * Flush GPU memory by calling Python gc.collect() + torch.mps.empty_cache().
 * This is called between pipeline stages to free VRAM.
 */
export async function flushGPUMemory(): Promise<void> {
  const py = pythonPath();
  const script = [
    "import gc; gc.collect()",
    "try:",
    "    import torch; torch.mps.empty_cache()",
    "except Exception:",
    "    pass",
  ].join("\n");

  try {
    await execFileAsync(py, ["-c", script], { timeout: 15000 });
  } catch {
    // Best-effort flush — if Python or torch is not available, continue
  }
}

/**
 * Compute recommended chunk size based on current memory pressure.
 * Halves the chunk size when pressure exceeds 80%.
 */
export function adaptiveChunkSize(baseChunk: number, pressure: number): number {
  if (pressure > 80) return Math.max(8, Math.floor(baseChunk / 2));
  return baseChunk;
}
