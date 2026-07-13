import React, { useState } from "react";
import { useStore } from "../../store.js";
import MiniCalendar from "../MiniCalendar.jsx";
import { monthLabel } from "../../utils.js";

export default function CalendarWidget() {
  const events = useStore((s) => s.events);
  const setActivePage = useStore((s) => s.setActivePage);
  const [monthDate, setMonthDate] = useState(new Date());

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
        <button
          className="no-drag btn-icon"
          style={{ width: 20, height: 20 }}
          onClick={() => setMonthDate(new Date(monthDate.getFullYear(), monthDate.getMonth() - 1, 1))}
        >
          ‹
        </button>
        <span className="font-display" style={{ fontSize: 11, fontWeight: 700, color: "var(--w-accent)" }}>
          {monthLabel(monthDate)}
        </span>
        <button
          className="no-drag btn-icon"
          style={{ width: 20, height: 20 }}
          onClick={() => setMonthDate(new Date(monthDate.getFullYear(), monthDate.getMonth() + 1, 1))}
        >
          ›
        </button>
      </div>
      <MiniCalendar monthDate={monthDate} events={events} compact />
      <button
        className="no-drag"
        style={{ marginTop: "auto", paddingTop: 8, fontSize: 10, fontWeight: 600, color: "var(--w-accent)", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}
        onClick={() => setActivePage("calendar")}
      >
        View Full Calendar →
      </button>
    </div>
  );
}
