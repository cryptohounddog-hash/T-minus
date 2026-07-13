export function futureDateTime(daysAhead, hour = 9, minute = 0) {
  const d = new Date();
  d.setHours(hour, minute, 0, 0);
  d.setDate(d.getDate() + daysAhead);
  return d.toISOString();
}

export function futureDateStr(daysAhead) {
  const d = new Date();
  d.setDate(d.getDate() + daysAhead);
  return d.toISOString().slice(0, 10);
}

export function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

export function countdownParts(targetIso, nowMs) {
  let diff = new Date(targetIso).getTime() - nowMs;
  const isPast = diff < 0;
  if (isPast) diff = Math.abs(diff);
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff / 3600000) % 24),
    minutes: Math.floor((diff / 60000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    isPast,
  };
}

export function pad2(n) {
  return n.toString().padStart(2, "0");
}

export function monthLabel(date) {
  return date.toLocaleDateString(undefined, { month: "long", year: "numeric" });
}

export function formatDate(iso) {
  return new Date(iso).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function formatTime(iso) {
  return new Date(iso).toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" });
}

export function uid() {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4);
}

export const SIZE_PRESETS = {
  sm: { w: 3, h: 6 },
  md: { w: 4, h: 6 },
  wide: { w: 6, h: 6 },
  lg: { w: 8, h: 6 },
  tall: { w: 4, h: 13 },
};

export function sizeToWH(size) {
  return SIZE_PRESETS[size] || SIZE_PRESETS.md;
}
