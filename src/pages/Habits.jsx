import React, { useState } from "react";
import { useStore } from "../store.js";

const DOW = ["S", "M", "T", "W", "T", "F", "S"];

export default function Habits() {
  const habits = useStore((s) => s.habits);
  const toggleHabitToday = useStore((s) => s.toggleHabitToday);
  const addHabit = useStore((s) => s.addHabit);
  const removeHabit = useStore((s) => s.removeHabit);

  const [label, setLabel] = useState("");
  const [icon, setIcon] = useState("✨");

  const doneToday = habits.filter((h) => h.completedToday).length;
  const bestStreak = habits.reduce((m, h) => Math.max(m, h.streak), 0);
  const dow = new Date().getDay();

  function handleAdd() {
    if (!label.trim()) return;
    addHabit({ label: label.trim(), icon: icon || "✨" });
    setLabel("");
    setIcon("✨");
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", gap: 20, fontSize: 12, color: "rgba(255,255,255,0.6)", flexWrap: "wrap" }}>
        <span>
          <b className="font-display" style={{ color: "var(--accent)" }}>
            {doneToday}/{habits.length}
          </b>{" "}
          done today
        </span>
        <span>
          Best streak:{" "}
          <b className="font-display" style={{ color: "var(--accent)" }}>
            {bestStreak} days
          </b>
        </span>
      </div>

      <div className="panel" style={{ padding: 16, display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
        <input type="text" style={{ maxWidth: 70, textAlign: "center" }} value={icon} onChange={(e) => setIcon(e.target.value)} />
        <input
          type="text"
          placeholder="New habit, e.g. Drink Water"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          style={{ flex: 1, minWidth: 180 }}
        />
        <button className="btn-solid" onClick={handleAdd}>
          + Add Habit
        </button>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {habits.map((h) => (
          <div key={h.id} className="panel" style={{ padding: 14, display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
            <span style={{ fontSize: 20, width: 32, textAlign: "center", flexShrink: 0 }}>{h.icon}</span>
            <div style={{ minWidth: 120, flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600 }}>{h.label}</div>
              <div style={{ fontSize: 10.5, color: "rgba(255,255,255,0.4)" }}>
                🔥 {h.streak} day{h.streak === 1 ? "" : "s"} streak
              </div>
            </div>
            <div style={{ display: "flex", gap: 4, flexShrink: 0 }}>
              {DOW.map((d, i) => (
                <div
                  key={i}
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: 6,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 9,
                    ...(i === dow && h.completedToday
                      ? { background: "var(--accent)", color: "#04030a", fontWeight: 700 }
                      : i <= dow
                      ? { background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.35)" }
                      : { background: "rgba(255,255,255,0.03)", color: "rgba(255,255,255,0.15)" }),
                  }}
                >
                  {d}
                </div>
              ))}
            </div>
            <button
              className="btn"
              style={h.completedToday ? { background: "var(--accent)", color: "#04030a", borderColor: "var(--accent)" } : undefined}
              onClick={() => toggleHabitToday(h.id)}
            >
              {h.completedToday ? "✓ Done Today" : "Mark Done"}
            </button>
            <button className="btn-icon danger" onClick={() => removeHabit(h.id)}>
              ×
            </button>
          </div>
        ))}
        {habits.length === 0 && <div className="empty-state panel">No habits yet. Add your first one above.</div>}
      </div>
    </div>
  );
}
