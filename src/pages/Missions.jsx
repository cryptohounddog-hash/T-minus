import React, { useState } from "react";
import { useStore } from "../store.js";
import WidgetModal from "../components/WidgetModal.jsx";
import CountdownWidget from "../components/widgets/CountdownWidget.jsx";
import NinetyDayWidget from "../components/widgets/NinetyDayWidget.jsx";
import { countdownParts, formatDate } from "../utils.js";

export default function Missions() {
  const widgets = useStore((s) => s.widgets);
  const events = useStore((s) => s.events);
  const hideWidget = useStore((s) => s.hideWidget);
  const showWidget = useStore((s) => s.showWidget);
  const removeWidget = useStore((s) => s.removeWidget);

  const [showAdd, setShowAdd] = useState(false);
  const [editing, setEditing] = useState(null);

  const missions = widgets.filter((w) => w.type === "countdown" || w.type === "ninetyday");
  const countdowns = missions.filter((w) => w.type === "countdown" && w.targetDate);
  const now = Date.now();
  const activeCount = countdowns.filter((w) => !countdownParts(w.targetDate, now).isPast).length;
  const upcoming14 = countdowns.filter((w) => {
    const p = countdownParts(w.targetDate, now);
    return !p.isPast && p.days <= 14;
  }).length;

  const nextEvents = [...events]
    .filter((e) => e.date >= new Date().toISOString().slice(0, 10))
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 6);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 12, color: "rgba(255,255,255,0.6)" }}>
          <span>🚀 <b className="font-display">{missions.length}</b> Missions</span>
          <span>⏳ <b className="font-display">{upcoming14}</b> Upcoming (14d)</span>
          <span>✅ <b className="font-display">{activeCount}</b> Active</span>
        </div>
        <button className="btn-solid" onClick={() => setShowAdd(true)}>
          + New Mission
        </button>
      </div>

      <div className="card-grid">
        {missions.map((w) => (
          <div key={w.id} className="panel" style={{ padding: 16, borderColor: `color-mix(in srgb, ${w.accent || "var(--accent)"} 40%, transparent)`, "--w-accent": w.accent || "var(--accent)" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
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
                <button className="btn-icon" title={w.hidden ? "Show on dashboard" : "Hide from dashboard"} onClick={() => (w.hidden ? showWidget(w.id) : hideWidget(w.id))}>
                  {w.hidden ? "⊕" : "⊖"}
                </button>
                <button className="btn-icon danger" title="Delete" onClick={() => removeWidget(w.id)}>
                  ×
                </button>
              </div>
            </div>
            <div style={{ height: 120 }}>
              {w.type === "countdown" ? <CountdownWidget widget={w} /> : <NinetyDayWidget widget={w} />}
            </div>
          </div>
        ))}
        {missions.length === 0 && (
          <div className="empty-state panel">
            No missions yet. Click <span style={{ color: "var(--accent)" }}>+ New Mission</span> to add a countdown.
          </div>
        )}
      </div>

      <div className="panel" style={{ padding: 16 }}>
        <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.03em", color: "rgba(255,255,255,0.4)", marginBottom: 12, fontWeight: 700 }} className="font-display">
          Upcoming Events
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {nextEvents.map((e) => (
            <div key={e.id} style={{ display: "flex", justifyContent: "space-between", fontSize: 12.5 }}>
              <span>{e.title}</span>
              <span style={{ color: e.color || "var(--accent)" }}>{formatDate(e.date)}</span>
            </div>
          ))}
          {nextEvents.length === 0 && <div style={{ fontSize: 11.5, color: "rgba(255,255,255,0.35)" }}>Nothing scheduled yet.</div>}
        </div>
      </div>

      {showAdd && <WidgetModal mode="add" initialType="countdown" onClose={() => setShowAdd(false)} />}
      {editing && <WidgetModal mode="edit" widget={editing} onClose={() => setEditing(null)} />}
    </div>
  );
}
