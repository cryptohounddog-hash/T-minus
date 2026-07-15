import React, { useMemo } from "react";
import { useNow } from "../../NowContext.jsx";

const TICKS = Array.from({ length: 12 }, (_, i) => i + 1).map((hour) => {
  const angle = (hour / 12) * 2 * Math.PI - Math.PI / 2;
  return { hour, x: 50 + 38 * Math.cos(angle), y: 50 + 38 * Math.sin(angle) };
});

export default function ClockWidget({ widget }) {
  const now = useNow();
  const date = useMemo(() => new Date(now), [now]);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const hourDeg = ((hours % 12) + minutes / 60) * 30;
  const minuteDeg = (minutes + seconds / 60) * 6;
  const [time, meridiem] = date
    .toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit", second: "2-digit", hour12: true })
    .split(" ");

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12, padding: "8px 12px" }}>
      <div className="clock-face">
        <div style={{ position: "absolute", top: 6, left: "50%", transform: "translateX(-50%)", width: 10, height: 10, borderRadius: "50%", background: "var(--accent-2)", boxShadow: "0 0 8px var(--accent-2)" }} />
        {TICKS.map((t) => (
          <div key={t.hour} className="clock-tick" style={{ left: `${t.x}%`, top: `${t.y}%` }}>
            {t.hour}
          </div>
        ))}
        <div className="clock-hand" style={{ width: 3, height: "24%", background: "var(--accent-2)", transform: `translateX(-50%) rotate(${hourDeg}deg)`, boxShadow: "0 0 6px var(--accent-2)" }} />
        <div className="clock-hand" style={{ width: 2, height: "33%", background: "var(--accent)", transform: `translateX(-50%) rotate(${minuteDeg}deg)`, boxShadow: "0 0 6px var(--accent)" }} />
        <div className="clock-center" />
      </div>
      <div style={{ textAlign: "center" }}>
        <div
          className="font-display glow-text"
          style={{
            fontWeight: 900,
            fontSize: 19,
            color: "var(--w-accent, var(--accent))",
            textShadow: "0 0 14px color-mix(in srgb, var(--w-accent, var(--accent)) 80%, transparent)",
          }}
        >
          {time} <span style={{ fontSize: 11, color: "rgba(255,255,255,0.5)" }}>{meridiem}</span>
        </div>
      </div>
      {widget.text && (
        <div style={{ textAlign: "center", padding: "0 8px" }}>
          <div className="font-display" style={{ fontSize: 11, fontWeight: 700, color: "var(--accent-2)" }}>
            ✦ {widget.text} ✦
          </div>
          {widget.extraValue && <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", marginTop: 2 }}>{widget.extraValue}</div>}
        </div>
      )}
    </div>
  );
}
