import React, { useState } from "react";
import { useStore } from "../store.js";
import WidgetModal from "../components/WidgetModal.jsx";

const GOAL_TYPES = ["progress", "savings", "reading", "study", "ninetyday"];

export default function Goals() {
  const widgets = useStore((s) => s.widgets);
  const updateWidget = useStore((s) => s.updateWidget);
  const removeWidget = useStore((s) => s.removeWidget);
  const activePage = useStore((s) => s.activePage);

  const [showAdd, setShowAdd] = useState(false);
  const [editing, setEditing] = useState(null);

  const isFinances = activePage === "finances";
  const goals = widgets.filter((w) => GOAL_TYPES.includes(w.type) && (!isFinances || w.type === "savings"));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button className="btn-solid" onClick={() => setShowAdd(true)}>
          + New Goal
        </button>
      </div>

      <div className="card-grid">
        {goals.map((w) => {
          const isNinety = w.type === "ninetyday";
          const start = w.startDate ? new Date(w.startDate) : new Date();
          const totalDays = w.totalDays || 90;
          const dayNum = Math.min(totalDays, Math.max(1, Math.floor((Date.now() - start.getTime()) / 86400000) + 1));
          const current = isNinety ? dayNum : w.current || 0;
          const target = isNinety ? totalDays : w.target || 100;
          const pct = Math.min(100, Math.round((current / (target || 1)) * 100));

          return (
            <div
              key={w.id}
              className="panel"
              style={{ padding: 16, display: "flex", flexDirection: "column", gap: 10, borderColor: `color-mix(in srgb, ${w.accent || "var(--accent)"} 40%, transparent)` }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 0 }}>
                  <span style={{ fontSize: 18 }}>{w.icon}</span>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: w.accent || "var(--accent)" }}>{w.title}</div>
                    {w.subtitle && <div style={{ fontSize: 10.5, color: "rgba(255,255,255,0.4)" }}>{w.subtitle}</div>}
                  </div>
                </div>
                <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                  <button className="btn-icon accent" title="Edit" onClick={() => setEditing(w)}>
                    ✎
                  </button>
                  <button className="btn-icon danger" title="Delete" onClick={() => removeWidget(w.id)}>
                    ×
                  </button>
                </div>
              </div>

              {isNinety ? (
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>
                  Day {current} of {target} · {Math.max(0, target - current)} days remaining
                </div>
              ) : (
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <button className="btn" style={{ padding: "4px 10px" }} onClick={() => updateWidget(w.id, { current: Math.max(0, current - 1) })}>
                    −
                  </button>
                  <input type="number" style={{ textAlign: "center" }} value={current} onChange={(e) => updateWidget(w.id, { current: Number(e.target.value) })} />
                  <button className="btn" style={{ padding: "4px 10px" }} onClick={() => updateWidget(w.id, { current: current + 1 })}>
                    +
                  </button>
                  <span style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", flexShrink: 0 }}>
                    / {target} {w.unit && w.unit !== "$" ? w.unit : ""}
                  </span>
                </div>
              )}

              <div>
                <div className="progress-track">
                  <div className="progress-fill" style={{ width: `${pct}%`, background: w.accent || "var(--accent)" }} />
                </div>
                <div style={{ textAlign: "right", fontSize: 10.5, marginTop: 4, fontWeight: 600, color: w.accent || "var(--accent)" }}>{pct}%</div>
              </div>

              <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 10.5, color: "rgba(255,255,255,0.4)" }}>
                Target
                <input
                  type="number"
                  style={{ width: 80 }}
                  value={isNinety ? totalDays : target}
                  onChange={(e) => updateWidget(w.id, isNinety ? { totalDays: Number(e.target.value) } : { target: Number(e.target.value) })}
                />
              </label>
            </div>
          );
        })}
        {goals.length === 0 && (
          <div className="empty-state panel">
            No goals yet. Click <span style={{ color: "var(--accent)" }}>+ New Goal</span> to start tracking progress.
          </div>
        )}
      </div>

      {showAdd && <WidgetModal mode="add" initialType={isFinances ? "savings" : "progress"} onClose={() => setShowAdd(false)} />}
      {editing && <WidgetModal mode="edit" widget={editing} onClose={() => setEditing(null)} />}
    </div>
  );
}
