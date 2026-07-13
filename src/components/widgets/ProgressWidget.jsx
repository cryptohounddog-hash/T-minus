import React from "react";

function formatValue(n, unit) {
  return unit === "$" ? `$${n.toLocaleString()}` : n.toLocaleString();
}

export default function ProgressWidget({ widget }) {
  const current = widget.current || 0;
  const target = widget.target || 100;
  const pct = Math.min(100, Math.round((current / target) * 100));
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", justifyContent: "space-between", gap: 8 }}>
      <div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
          <span className="font-display glow-text" style={{ fontWeight: 900, fontSize: 24, color: "var(--w-accent)" }}>
            {formatValue(current, widget.unit)}
          </span>
          <span style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>
            {widget.unit === "$" ? `of ${formatValue(target, widget.unit)} goal` : `/ ${formatValue(target, widget.unit)}`}
          </span>
        </div>
        {widget.unit && widget.unit !== "$" && (
          <div style={{ fontSize: 10.5, color: "rgba(255,255,255,0.4)" }}>{widget.unit}</div>
        )}
      </div>
      <div>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${pct}%` }} />
        </div>
        <div style={{ textAlign: "right", fontSize: 10, marginTop: 4, fontWeight: 600, color: "var(--w-accent)" }}>{pct}%</div>
      </div>
      {widget.extraValue && (
        <div style={{ paddingTop: 6, borderTop: "1px solid rgba(255,255,255,0.1)" }}>
          {widget.extraLabel && (
            <div style={{ fontSize: 9, textTransform: "uppercase", letterSpacing: "0.05em", color: "rgba(255,255,255,0.35)" }}>
              {widget.extraLabel}
            </div>
          )}
          <div style={{ fontSize: 12, fontWeight: 600 }}>{widget.extraValue}</div>
          {widget.extraSub && <div style={{ fontSize: 10.5, color: "rgba(255,255,255,0.4)" }}>{widget.extraSub}</div>}
        </div>
      )}
    </div>
  );
}
