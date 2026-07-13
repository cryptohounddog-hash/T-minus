import React, { useState } from "react";
import { useStore } from "../store.js";

// Shared page for simple icon+title+subtitle lists: Resources and Friends.
export default function ListPage({ storeKey }) {
  const items = useStore((s) => s[storeKey]);
  const addListItem = useStore((s) => s.addListItem);
  const removeListItem = useStore((s) => s.removeListItem);

  const isResources = storeKey === "resources";
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [icon, setIcon] = useState(isResources ? "🔖" : "🙂");

  function handleAdd() {
    if (!title.trim()) return;
    addListItem(storeKey, { title: title.trim(), subtitle: subtitle.trim(), icon: icon || (isResources ? "🔖" : "🙂") });
    setTitle("");
    setSubtitle("");
    setIcon(isResources ? "🔖" : "🙂");
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div className="panel" style={{ padding: 16, display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
        <input type="text" style={{ maxWidth: 60, textAlign: "center" }} value={icon} onChange={(e) => setIcon(e.target.value)} />
        <input
          type="text"
          placeholder={isResources ? "Resource title" : "Friend name"}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ flex: 1, minWidth: 160 }}
        />
        <input
          type="text"
          placeholder={isResources ? "Description (optional)" : "Note (optional)"}
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
          style={{ flex: 1, minWidth: 160 }}
        />
        <button className="btn-solid" onClick={handleAdd}>
          + Add
        </button>
      </div>

      <div className="card-grid">
        {items.map((item) => (
          <div key={item.id} className="panel" style={{ padding: 14, display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 20, flexShrink: 0 }}>{item.icon}</span>
            <div style={{ minWidth: 0, flex: 1 }}>
              <div style={{ fontSize: 12.5, fontWeight: 600 }}>{item.title}</div>
              {item.subtitle && <div style={{ fontSize: 10.5, color: "rgba(255,255,255,0.4)" }}>{item.subtitle}</div>}
            </div>
            <button className="btn-icon danger" onClick={() => removeListItem(storeKey, item.id)}>
              ×
            </button>
          </div>
        ))}
        {items.length === 0 && <div className="empty-state panel">Nothing here yet.</div>}
      </div>
    </div>
  );
}
