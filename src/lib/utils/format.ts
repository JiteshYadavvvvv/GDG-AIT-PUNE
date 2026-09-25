/** 0 → "01" */
export function formatIndex(index: number) {
  return String(index + 1).padStart(2, "0");
}
