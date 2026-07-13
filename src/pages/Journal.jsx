import React, { useState } from "react";
import { useStore } from "../store.js";
import { formatDate, todayStr } from "../utils.js";

const MOODS = ["💪", "🙏", "😊", "😬", "😔", "🎉", "🎵", "📚"];

export default function Journal() {
  const journal = useStore((s) => s.journal);
  const addJournalEntry = useStore((s) => s.addJournalEntry);
  const removeJournalEntry = useStore((s) => s.removeJournalEntry);

  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [mood, setMood] = useState("💪");

  function save() {
    if (!title.trim() && !body.trim()) return;
    addJournalEntry({ title: title.trim() || "Untitled Entry", body: body.trim(), mood, date: todayStr() });
    setTitle("");
    setBody("");
    setMood("💪");
    setOpen(false);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <p style={{ fontSize: 12.5, color: "rgba(255,255,255,0.5)" }}>Reflection, gratitude, prayers, and lessons learned.</p>
        <button className="btn-solid" onClick={() => setOpen((o) => !o)}>
          {open ? "Cancel" : "+ New Entry"}
        </button>
      </div>

      {open && (
        <div className="panel" style={{ padding: 16, display: "flex", flexDirection: "column", gap: 10 }}>
          <input type="text" placeholder="Entry title" value={title} onChange={(e) => setTitle(e.target.value)} />
          <textarea rows={4} placeholder="What's on your mind?" value={body} onChange={(e) => setBody(e.target.value)} />
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {MOODS.map((m) => (
              <button
                key={m}
                onClick={() => setMood(m)}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 16,
                  border: "none",
                  cursor: "pointer",
                  ...(mood === m ? { background: "var(--accent)", boxShadow: "0 0 10px var(--accent)" } : { background: "rgba(255,255,255,0.06)" }),
                }}
              >
                {m}
              </button>
            ))}
          </div>
          <button className="btn-solid" style={{ alignSelf: "flex-start" }} onClick={save}>
            Save Entry
          </button>
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {journal.map((j) => (
          <div key={j.id} className="panel" style={{ padding: 16 }}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 0 }}>
                <span style={{ fontSize: 18, flexShrink: 0 }}>{j.mood}</span>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: 13.5, fontWeight: 700 }}>{j.title}</div>
                  <div style={{ fontSize: 10.5, color: "rgba(255,255,255,0.4)" }}>{formatDate(j.date)}</div>
                </div>
              </div>
              <button className="btn-icon danger" onClick={() => removeJournalEntry(j.id)}>
                ×
              </button>
            </div>
            {j.body && <p style={{ fontSize: 12.5, color: "rgba(255,255,255,0.7)", marginTop: 8, lineHeight: 1.5, whiteSpace: "pre-line" }}>{j.body}</p>}
          </div>
        ))}
        {journal.length === 0 && <div className="empty-state panel">No journal entries yet.</div>}
      </div>
    </div>
  );
}
