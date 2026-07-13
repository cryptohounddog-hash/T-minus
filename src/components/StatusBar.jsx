import React from "react";
import { useStore } from "../store.js";

function StatusItem({ icon, label, sub, dotColor }) {
  return (
    <div className="status-item">
      <span className="status-item-icon">{icon}</span>
      <div>
        <div className="status-item-label">
          {dotColor && <span className="status-dot" style={{ background: dotColor }} />}
          {label}
        </div>
        <div className="status-item-sub">{sub}</div>
      </div>
    </div>
  );
}

export default function StatusBar() {
  const template = useStore((s) => s.template);
  const vitals = useStore((s) => s.vitals);
  const habits = useStore((s) => s.habits);

  const doneToday = habits.filter((h) => h.completedToday).length;
  const focusTier = vitals.focusLevel >= 75 ? "HIGH" : vitals.focusLevel >= 45 ? "MEDIUM" : "LOW";

  return (
    <div className="status-bar panel">
      {template === "student" ? (
        <>
          <StatusItem icon="🔥" label={`${vitals.streakDays} Days`} sub="Streak" />
          <StatusItem icon="👑" label={`${doneToday} / ${habits.length}`} sub="Habits Completed" />
        </>
      ) : (
        <StatusItem icon="◈" label={vitals.systemStatus} sub="System Status" dotColor="#22c55e" />
      )}

      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.05em", color: "rgba(255,255,255,0.4)" }}>
          Focus Level
        </span>
        <span className="font-display" style={{ fontSize: 11, fontWeight: 700, color: "var(--accent)" }}>
          {focusTier}
        </span>
        <div style={{ display: "flex", gap: 2 }}>
          {Array.from({ length: 10 }).map((_, i) => (
            <span
              key={i}
              style={{
                display: "block",
                width: 6,
                height: 12,
                borderRadius: 2,
                background:
                  i < Math.round(vitals.focusLevel / 10)
                    ? "linear-gradient(180deg, var(--accent-2), var(--accent))"
                    : "rgba(255,255,255,0.1)",
              }}
            />
          ))}
        </div>
      </div>

      <StatusItem icon="⚡" label={`${vitals.energyPercent}%`} sub="Energy" />

      <div style={{ display: "flex", alignItems: "center", gap: 6, color: "rgba(255,255,255,0.7)" }}>
        <span>⭐</span>
        <span style={{ fontWeight: 500 }}>{vitals.affirmation}</span>
      </div>
    </div>
  );
}
