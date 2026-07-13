import React from "react";
import { useStore } from "../store.js";

export default function Messages() {
  const messages = useStore((s) => s.messages);
  const toggleMessageRead = useStore((s) => s.toggleMessageRead);
  const unread = messages.filter((m) => m.unread).length;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ fontSize: 12.5, color: "rgba(255,255,255,0.55)" }}>
        <span className="font-display" style={{ color: "var(--accent)", fontWeight: 700 }}>
          {unread}
        </span>{" "}
        unread message{unread === 1 ? "" : "s"}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {messages.map((m) => (
          <button
            key={m.id}
            className="panel"
            style={{
              padding: 14,
              display: "flex",
              alignItems: "center",
              gap: 12,
              textAlign: "left",
              cursor: "pointer",
              border: "none",
              color: "inherit",
              borderColor: m.unread ? "color-mix(in srgb, var(--accent) 45%, transparent)" : undefined,
            }}
            onClick={() => toggleMessageRead(m.id)}
          >
            <span style={{ fontSize: 20, flexShrink: 0 }}>{m.avatar}</span>
            <div style={{ minWidth: 0, flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 12.5, fontWeight: 600 }}>{m.from}</span>
                {m.unread && <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent)" }} />}
              </div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{m.preview}</div>
            </div>
            <span style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", flexShrink: 0 }}>{m.time}</span>
          </button>
        ))}
        {messages.length === 0 && <div className="empty-state panel">No messages yet.</div>}
      </div>
    </div>
  );
}
