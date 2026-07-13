import React, { useState } from "react";
import { useStore } from "../store.js";
import MiniCalendar from "../components/MiniCalendar.jsx";
import { monthLabel, todayStr, formatDate } from "../utils.js";

export default function CalendarPage() {
  const events = useStore((s) => s.events);
  const addEvent = useStore((s) => s.addEvent);
  const removeEvent = useStore((s) => s.removeEvent);

  const [monthDate, setMonthDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(todayStr());
  const [newEvent, setNewEvent] = useState({ title: "", time: "" });

  const dayEvents = events.filter((e) => e.date === selectedDate).sort((a, b) => (a.time || "").localeCompare(b.time || ""));
  const upcoming = [...events]
    .filter((e) => e.date >= todayStr())
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 8);

  function handleAdd() {
    if (!newEvent.title.trim()) return;
    addEvent({ date: selectedDate, title: newEvent.title.trim(), time: newEvent.time, color: "var(--accent)" });
    setNewEvent({ title: "", time: "" });
  }

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 16 }}>
      <div className="panel" style={{ padding: 20 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
          <button className="btn" style={{ padding: "6px 12px" }} onClick={() => setMonthDate(new Date(monthDate.getFullYear(), monthDate.getMonth() - 1, 1))}>
            ‹
          </button>
          <span className="font-display" style={{ fontSize: 16, fontWeight: 700, color: "var(--accent)" }}>
            {monthLabel(monthDate)}
          </span>
          <button className="btn" style={{ padding: "6px 12px" }} onClick={() => setMonthDate(new Date(monthDate.getFullYear(), monthDate.getMonth() + 1, 1))}>
            ›
          </button>
        </div>
        <MiniCalendar monthDate={monthDate} events={events} onSelectDate={setSelectedDate} selectedDate={selectedDate} />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div className="panel" style={{ padding: 16 }}>
          <div style={{ fontSize: 11, textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: 8, fontWeight: 700 }} className="font-display">
            {new Date(selectedDate + "T00:00:00").toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" })}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 12 }}>
            {dayEvents.map((e) => (
              <div key={e.id} className="item-row">
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: 12.5 }}>{e.title}</div>
                  {e.time && <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)" }}>{e.time}</div>}
                </div>
                <button className="btn-icon danger" onClick={() => removeEvent(e.id)}>
                  ×
                </button>
              </div>
            ))}
            {dayEvents.length === 0 && <div style={{ fontSize: 11.5, color: "rgba(255,255,255,0.35)" }}>No events this day.</div>}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, paddingTop: 12, borderTop: "1px solid rgba(255,255,255,0.1)" }}>
            <input
              type="text"
              placeholder="Event title"
              value={newEvent.title}
              onChange={(e) => setNewEvent((f) => ({ ...f, title: e.target.value }))}
              onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            />
            <div style={{ display: "flex", gap: 8 }}>
              <input type="time" value={newEvent.time} onChange={(e) => setNewEvent((f) => ({ ...f, time: e.target.value }))} />
              <button className="btn-solid" style={{ flexShrink: 0 }} onClick={handleAdd}>
                + Add
              </button>
            </div>
          </div>
        </div>

        <div className="panel" style={{ padding: 16 }}>
          <div style={{ fontSize: 11, textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: 8, fontWeight: 700 }} className="font-display">
            Upcoming
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {upcoming.map((e) => (
              <div key={e.id} style={{ display: "flex", justifyContent: "space-between", fontSize: 12 }}>
                <span>{e.title}</span>
                <span style={{ color: "rgba(255,255,255,0.4)" }}>{formatDate(e.date)}</span>
              </div>
            ))}
            {upcoming.length === 0 && <div style={{ fontSize: 11.5, color: "rgba(255,255,255,0.35)" }}>Nothing upcoming.</div>}
          </div>
        </div>
      </div>
    </div>
  );
}
