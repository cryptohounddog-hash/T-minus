import React from "react";
import { useStore } from "../../store.js";

export default function ChecklistWidget({ widget }) {
  const toggleChecklistItem = useStore((s) => s.toggleChecklistItem);
  const items = widget.items || [];
  const doneCount = items.filter((i) => i.done).length;

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6, overflowY: "auto" }}>
        {items.map((item) => (
          <button
            key={item.id}
            className="checklist-item no-drag"
            onClick={() => toggleChecklistItem(widget.id, item.id)}
          >
            <span className={"checklist-check" + (item.done ? " done" : "")}>{item.done ? "✓" : ""}</span>
            <span className={"checklist-label" + (item.done ? " done" : "")} style={{ fontSize: 12.5 }}>
              {item.label}
            </span>
          </button>
        ))}
        {items.length === 0 && (
          <div style={{ fontSize: 11.5, color: "rgba(255,255,255,0.35)" }}>
            No items yet — edit this widget to add some.
          </div>
        )}
      </div>
      {items.length > 0 && (
        <div style={{ paddingTop: 8, marginTop: 4, borderTop: "1px solid rgba(255,255,255,0.1)", fontSize: 10, color: "rgba(255,255,255,0.4)", display: "flex", justifyContent: "space-between" }}>
          <span>
            {doneCount}/{items.length} complete
          </span>
          {doneCount === items.length && <span style={{ fontWeight: 600, color: "var(--w-accent)" }}>Complete! ✨</span>}
        </div>
      )}
    </div>
  );
}
