import React from "react";

export default function NinetyDayWidget({ widget }) {
  const totalDays = widget.totalDays || 90;
  const start = widget.startDate ? new Date(widget.startDate) : new Date();
  const dayNum = Math.min(totalDays, Math.max(1, Math.floor((Date.now() - start.getTime()) / 86400000) + 1));
  const remaining = Math.max(0, totalDays - dayNum);
  const pct = Math.min(100, Math.round((dayNum / totalDays) * 100));
  const nextMilestone = Math.min(Math.ceil(dayNum / 30) * 30, totalDays);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", justifyContent: "space-between", gap: 8 }}>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 12 }}>
        <div>
          <div className="font-display glow-text" style={{ fontWeight: 900, fontSize: 28, lineHeight: 1, color: "var(--w-accent)" }}>
            {remaining}
          </div>
          <div style={{ fontSize: 9.5, textTransform: "uppercase", letterSpacing: "0.05em", color: "rgba(255,255,255,0.4)" }}>
            Days Remaining
          </div>
        </div>
        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", paddingBottom: 4 }}>
          Day {dayNum} of {totalDays}
        </div>
      </div>
      <div>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${pct}%` }} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, marginTop: 4 }}>
          <span style={{ fontWeight: 600, color: "var(--w-accent)" }}>{pct}% Complete</span>
          <span style={{ color: "rgba(255,255,255,0.4)" }}>🚩 Next: Day {nextMilestone}</span>
        </div>
      </div>
    </div>
  );
}
