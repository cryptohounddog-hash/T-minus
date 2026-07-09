import type { WidgetLayout, WidgetSize } from '../types';

export const GRID_COLS = 12;
export const ROW_HEIGHT = 22;
export const GRID_MARGIN = 12;

const SIZE_WH: Record<WidgetSize, { w: number; h: number }> = {
  sm: { w: 3, h: 6 },
  md: { w: 4, h: 6 },
  wide: { w: 6, h: 6 },
  lg: { w: 8, h: 6 },
  tall: { w: 4, h: 13 },
};

export function sizeToWH(size: WidgetSize): { w: number; h: number } {
  return SIZE_WH[size];
}

function findSlot(heights: number[], w: number): { x: number; y: number } {
  const clampedW = Math.min(w, GRID_COLS);
  let bestX = 0;
  let bestY = Infinity;
  for (let x = 0; x <= GRID_COLS - clampedW; x++) {
    let y = 0;
    for (let c = x; c < x + clampedW; c++) y = Math.max(y, heights[c]);
    if (y < bestY) {
      bestY = y;
      bestX = x;
    }
  }
  return { x: bestX, y: bestY };
}

/** Simple skyline/shelf packer that mimics CSS grid "dense" auto-flow: fills the
 * topmost-leftmost open slot for each item in order, given a fixed column count. */
export function packLayout(items: { id: string; w: number; h: number }[]): Record<string, WidgetLayout> {
  const heights = new Array(GRID_COLS).fill(0);
  const result: Record<string, WidgetLayout> = {};
  for (const item of items) {
    const w = Math.min(item.w, GRID_COLS);
    const { x, y } = findSlot(heights, w);
    result[item.id] = { x, y, w, h: item.h };
    for (let c = x; c < x + w; c++) heights[c] = y + item.h;
  }
  return result;
}

/** Finds an open slot for one new item without disturbing any existing layout. */
export function findOpenSlot(existing: WidgetLayout[], w: number): { x: number; y: number } {
  const heights = new Array(GRID_COLS).fill(0);
  for (const item of existing) {
    for (let c = item.x; c < item.x + item.w && c < GRID_COLS; c++) {
      heights[c] = Math.max(heights[c], item.y + item.h);
    }
  }
  return findSlot(heights, w);
}
