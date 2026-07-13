import React from "react";
import { todayStr } from "../utils.js";

const DOW = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

function isoFor(year, month, day) {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

export default function MiniCalendar({ monthDate, events, onSelectDate, selectedDate, compact = false }) {
  const year = monthDate.getFullYear();
  const month = monthDate.getMonth();
  const firstDow = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();
  const today = todayStr();

  const byDate = new Map();
  for (const e of events) {
    const arr = byDate.get(e.date) || [];
    arr.push(e);
    byDate.set(e.date, arr);
  }

  const cells = [];
  for (let i = firstDow - 1; i >= 0; i--) cells.push({ label: daysInPrevMonth - i, iso: "", inMonth: false });
  for (let d = 1; d <= daysInMonth; d++) cells.push({ label: d, iso: isoFor(year, month, d), inMonth: true });
  let filler = 1;
  while (cells.length % 7 !== 0) cells.push({ label: filler++, iso: "", inMonth: false });

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", marginBottom: 4 }}>
        {DOW.map((d) => (
          <div key={d} style={{ textAlign: "center", fontSize: 8.5, color: "rgba(255,255,255,0.35)", fontWeight: 600, padding: "4px 0" }}>
            {compact ? d[0] : d}
          </div>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", rowGap: 2 }}>
        {cells.map((c, idx) => {
          const isToday = c.inMonth && c.iso === today;
          const isSelected = c.inMonth && c.iso === selectedDate;
          const dayEvents = c.inMonth ? byDate.get(c.iso) || [] : [];
          return (
            <button
              key={idx}
              type="button"
              disabled={!c.inMonth}
              onClick={() => c.inMonth && onSelectDate?.(c.iso)}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 2,
                margin: "0 auto",
                borderRadius: 6,
                width: compact ? 28 : 36,
                height: compact ? 28 : 36,
                fontSize: compact ? 10 : 12,
                background: "none",
                cursor: c.inMonth && onSelectDate ? "pointer" : "default",
                color: c.inMonth ? "rgba(255,255,255,0.75)" : "rgba(255,255,255,0.15)",
                border: isToday ? "1.5px solid var(--accent)" : "1px solid transparent",
                ...(isToday ? { color: "var(--accent)" } : {}),
                ...(isSelected && !isToday ? { background: "color-mix(in srgb, var(--accent) 25%, transparent)" } : {}),
              }}
            >
              <span>{c.label}</span>
              {dayEvents.length > 0 && (
                <span style={{ display: "flex", gap: 2 }}>
                  {dayEvents.slice(0, 3).map((e) => (
                    <span key={e.id} style={{ display: "block", borderRadius: "50%", width: 3, height: 3, background: e.color || "var(--accent)" }} />
                  ))}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
