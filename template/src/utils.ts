/**
 * Shared utilities for {{EXTENSION_NAME}}.
 *
 * Keep this file lean — only add helpers that are used by 2+ commands.
 */

/**
 * Sanitize user input: trim whitespace and remove control characters.
 */
export function sanitizeInput(input: string): string {
  return input.trim().replace(/[\x00-\x1F\x7F]/g, "");
}

/**
 * Format a date as ISO string (date part only).
 */
export function formatDate(date: Date): string {
  return date.toISOString().split("T")[0];
}

/**
 * Truncate a string to maxLength, appending "..." if truncated.
 */
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength - 3) + "...";
}
