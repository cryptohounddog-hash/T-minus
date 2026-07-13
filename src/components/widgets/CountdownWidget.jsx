import React from "react";
import { useNow } from "../../NowContext.jsx";
import { countdownParts, formatDate, formatTime } from "../../utils.js";

function Unit({ value, label }) {
  return (
    <div className="countdown-unit">
      <span className="countdown-value glow-text" style={{ color: "var(--w-accent)" }}>
        {String(value).padStart(2, "0")}
      </span>
      <span className="countdown-label">{label}</span>
    </div>
  );
}

export default function CountdownWidget({ widget }) {
  const now = useNow();
  if (!widget.targetDate) return null;
  const { days, hours, minutes, seconds, isPast } = countdownParts(widget.targetDate, now);
  const hasProgress = widget.current !== undefined && widget.target !== undefined;
  const pct = hasProgress ? Math.min(100, Math.round(((widget.current || 0) / (widget.target || 1)) * 100)) : null;

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", justifyContent: "space-between", gap: 8 }}>
      <div className="countdown-row">
        <Unit value={days} label="DAYS" />
        <span className="countdown-colon">:</span>
        <Unit value={hours} label="HRS" />
        <span className="countdown-colon">:</span>
        <Unit value={minutes} label="MINS" />
        <span className="countdown-colon">:</span>
        <Unit value={seconds} label="SECS" />
      </div>
      {isPast && <div style={{ fontSize: 10, color: "#fcd34d" }}>This moment has arrived!</div>}
      <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 10.5, color: "rgba(255,255,255,0.45)" }}>
        <span>📅</span>
        <span>{formatDate(widget.targetDate)}</span>
        {widget.targetDate.slice(11, 16) !== "00:00" && (
          <>
            <span>•</span>
            <span>🕐 {formatTime(widget.targetDate)}</span>
          </>
        )}
      </div>
      {hasProgress && (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "rgba(255,255,255,0.45)", marginBottom: 4 }}>
            <span>{widget.extraLabel || "Progress"}</span>
            <span style={{ fontWeight: 600, color: "var(--w-accent)" }}>{pct}%</span>
          </div>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${pct}%` }} />
          </div>
        </div>
      )}
      {widget.ctaLabel && (
        <div style={{ fontSize: 10.5, fontWeight: 600, color: "var(--w-accent)", marginTop: "auto" }}>
          {widget.ctaLabel} →
        </div>
      )}
    </div>
  );
}
