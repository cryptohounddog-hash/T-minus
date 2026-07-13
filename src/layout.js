export const GRID_COLS = 12;

// Leftmost-lowest bin packer: finds the column position with the smallest
// available top offset for a widget of the given width, scanning existing
// widget layouts. Used to place newly-added widgets without overlap.
export function placeWidget(existingLayouts, w) {
  const width = Math.min(w, GRID_COLS);
  const heights = new Array(GRID_COLS).fill(0);
  for (const l of existingLayouts) {
    for (let c = l.x; c < l.x + l.w && c < GRID_COLS; c++) {
      heights[c] = Math.max(heights[c], l.y + l.h);
    }
  }
  let bestX = 0;
  let bestMax = Infinity;
  for (let x = 0; x <= GRID_COLS - width; x++) {
    let max = 0;
    for (let c = x; c < x + width; c++) max = Math.max(max, heights[c]);
    if (max < bestMax) {
      bestMax = max;
      bestX = x;
    }
  }
  if (bestMax === Infinity) bestMax = 0;
  return { x: bestX, y: bestMax };
}
