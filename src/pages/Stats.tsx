import { useStore } from '../store/useStore';

export default function Stats() {
  const { widgets, habits, journal, achievements, profile, vitals } = useStore();

  const goalWidgets = widgets.filter((w) => w.current !== undefined && w.target !== undefined);
  const overallPct = goalWidgets.length
    ? Math.round(goalWidgets.reduce((sum, w) => sum + Math.min(100, ((w.current ?? 0) / (w.target || 1)) * 100), 0) / goalWidgets.length)
    : 0;
  const habitRate = habits.length ? Math.round((habits.filter((h) => h.completedToday).length / habits.length) * 100) : 0;
  const bestStreak = habits.reduce((m, h) => Math.max(m, h.streak), 0);
  const unlockedAch = achievements.filter((a) => a.unlocked).length;

  const cards = [
    { label: 'Overall Goal Progress', value: `${overallPct}%`, icon: '🎯' },
    { label: 'Level', value: `${profile.level}`, icon: '⭐' },
    { label: 'XP', value: `${profile.xp.toLocaleString()} / ${profile.xpMax.toLocaleString()}`, icon: '✨' },
    { label: 'Current Streak', value: `${vitals.streakDays} days`, icon: '🔥' },
    { label: 'Best Habit Streak', value: `${bestStreak} days`, icon: '👑' },
    { label: "Today's Habit Rate", value: `${habitRate}%`, icon: '✅' },
    { label: 'Journal Entries', value: `${journal.length}`, icon: '📓' },
    { label: 'Achievements Unlocked', value: `${unlockedAch}/${achievements.length}`, icon: '🏆' },
  ];

  return (
    <div className="flex flex-col gap-5">
      <div className="grid gap-3" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 1fr))' }}>
        {cards.map((c) => (
          <div key={c.label} className="panel rounded-2xl p-4">
            <div className="text-lg mb-1">{c.icon}</div>
            <div className="font-display font-black text-[20px] tabular" style={{ color: 'var(--accent)' }}>
              {c.value}
            </div>
            <div className="text-[10.5px] uppercase tracking-wide text-white/40 mt-0.5">{c.label}</div>
          </div>
        ))}
      </div>

      <div className="panel rounded-2xl p-5">
        <h3 className="font-display font-bold text-[13px] mb-3" style={{ color: 'var(--accent)' }}>
          Goals Breakdown
        </h3>
        <div className="flex flex-col gap-3">
          {goalWidgets.map((w) => {
            const pct = Math.min(100, Math.round(((w.current ?? 0) / (w.target || 1)) * 100));
            return (
              <div key={w.id}>
                <div className="flex justify-between text-[11.5px] text-white/60 mb-1">
                  <span>
                    {w.icon} {w.title}
                  </span>
                  <span>{pct}%</span>
                </div>
                <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${pct}%`, background: w.accent ?? 'var(--accent)' }} />
                </div>
              </div>
            );
          })}
          {goalWidgets.length === 0 && <div className="text-[11.5px] text-white/35">No goals tracked yet.</div>}
        </div>
      </div>
    </div>
  );
}
