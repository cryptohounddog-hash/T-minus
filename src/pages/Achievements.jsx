import React from "react";
import { useStore } from "../store.js";
import { formatDate } from "../utils.js";

export default function Achievements() {
  const achievements = useStore((s) => s.achievements);
  const unlocked = achievements.filter((a) => a.unlocked);
  const ordered = [...unlocked, ...achievements.filter((a) => !a.unlocked)];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ fontSize: 12.5, color: "rgba(255,255,255,0.55)" }}>
        <span className="font-display" style={{ color: "var(--accent)", fontWeight: 700 }}>
          {unlocked.length}/{achievements.length}
        </span>{" "}
        unlocked
      </div>
      <div className="card-grid">
        {ordered.map((a) => (
          <div key={a.id} className="panel" style={{ padding: 16, display: "flex", flexDirection: "column", gap: 8, opacity: a.unlocked ? 1 : 0.45 }}>
            <div style={{ fontSize: 24 }}>{a.unlocked ? a.icon : "🔒"}</div>
            <div className="font-display" style={{ fontSize: 13, fontWeight: 700 }}>
              {a.title}
            </div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", lineHeight: 1.4 }}>{a.description}</div>
            {a.unlocked && a.date && <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", marginTop: "auto", paddingTop: 4 }}>Unlocked {formatDate(a.date)}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}
