import React from "react";
import { useStore } from "../store.js";

const GOAL_TYPES = ["progress", "savings", "reading", "study"];

export default function Stats() {
  const widgets = useStore((s) => s.widgets);
  const habits = useStore((s) => s.habits);
  const journal = useStore((s) => s.journal);
  const achievements = useStore((s) => s.achievements);
  const profile = useStore((s) => s.profile);
  const vitals = useStore((s) => s.vitals);

  const goals = widgets.filter((w) => GOAL_TYPES.includes(w.type) && w.current !== undefined && w.target !== undefined);
  const avgGoalPct = goals.length
    ? Math.round(goals.reduce((sum, g) => sum + Math.min(100, ((g.current || 0) / (g.target || 1)) * 100), 0) / goals.length)
    : 0;
  const doneToday = habits.length ? Math.round((habits.filter((h) => h.completedToday).length / habits.length) * 100) : 0;
  const bestStreak = habits.reduce((m, h) => Math.max(m, h.streak), 0);
  const unlocked = achievements.filter((a) => a.unlocked).length;

  const tiles = [
    { label: "Overall Goal Progress", value: `${avgGoalPct}%`, icon: "🎯" },
    { label: "Level", value: `${profile.level}`, icon: "⭐" },
    { label: "XP", value: `${profile.xp.toLocaleString()} / ${profile.xpMax.toLocaleString()}`, icon: "✨" },
    { label: "Current Streak", value: `${vitals.streakDays} days`, icon: "🔥" },
    { label: "Best Habit Streak", value: `${bestStreak} days`, icon: "👑" },
    { label: "Today's Habit Rate", value: `${doneToday}%`, icon: "✅" },
    { label: "Journal Entries", value: `${journal.length}`, icon: "📓" },
    { label: "Achievements Unlocked", value: `${unlocked}/${achievements.length}`, icon: "🏆" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(190px, 1fr))", gap: 12 }}>
        {tiles.map((t) => (
          <div key={t.label} className="panel" style={{ padding: 16 }}>
            <div style={{ fontSize: 18, marginBottom: 4 }}>{t.icon}</div>
            <div className="font-display" style={{ fontWeight: 900, fontSize: 20, color: "var(--accent)" }}>
              {t.value}
            </div>
            <div style={{ fontSize: 10.5, textTransform: "uppercase", letterSpacing: "0.03em", color: "rgba(255,255,255,0.4)", marginTop: 2 }}>{t.label}</div>
          </div>
        ))}
      </div>

      <div className="panel" style={{ padding: 20 }}>
        <h3 className="font-display" style={{ fontSize: 13, fontWeight: 700, color: "var(--accent)", marginBottom: 12 }}>
          Goals Breakdown
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {goals.map((g) => {
            const pct = Math.min(100, Math.round(((g.current || 0) / (g.target || 1)) * 100));
            return (
              <div key={g.id}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11.5, color: "rgba(255,255,255,0.6)", marginBottom: 4 }}>
                  <span>
                    {g.icon} {g.title}
                  </span>
                  <span>{pct}%</span>
                </div>
                <div className="progress-track">
                  <div className="progress-fill" style={{ width: `${pct}%`, background: g.accent || "var(--accent)" }} />
                </div>
              </div>
            );
          })}
          {goals.length === 0 && <div style={{ fontSize: 11.5, color: "rgba(255,255,255,0.35)" }}>No goals tracked yet.</div>}
        </div>
      </div>
    </div>
  );
}
