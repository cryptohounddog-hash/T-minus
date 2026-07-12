import { useStore } from '../store/useStore';

export default function StatusBar() {
  const { template, vitals, habits } = useStore();
  const habitsDone = habits.filter((h) => h.completedToday).length;

  const focusWord = vitals.focusLevel >= 75 ? 'HIGH' : vitals.focusLevel >= 45 ? 'MEDIUM' : 'LOW';

  return (
    <div className="panel rounded-2xl px-5 py-3 flex items-center justify-between gap-4 flex-wrap text-[12px]">
      {template === 'student' ? (
        <>
          <StatItem icon="🔥" label={`${vitals.streakDays} Days`} sub="Streak" />
          <StatItem icon="👑" label={`${habitsDone} / ${habits.length}`} sub="Habits Completed" />
        </>
      ) : (
        <StatItem icon="◈" label={vitals.systemStatus} sub="System Status" dotColor="#22c55e" />
      )}

      <div className="flex items-center gap-2">
        <span className="text-[10px] uppercase tracking-wide text-white/40">Focus Level</span>
        <span className="font-display font-bold text-[11px]" style={{ color: 'var(--accent)' }}>
          {focusWord}
        </span>
        <div className="flex gap-0.5">
          {Array.from({ length: 10 }).map((_, i) => (
            <span
              key={i}
              className="block w-1.5 h-3 rounded-sm"
              style={{
                background:
                  i < Math.round(vitals.focusLevel / 10)
                    ? 'linear-gradient(180deg, var(--accent-2), var(--accent))'
                    : 'rgba(255,255,255,0.1)',
              }}
            />
          ))}
        </div>
      </div>

      <StatItem icon="⚡" label={`${vitals.energyPercent}%`} sub="Energy" />

      <div className="flex items-center gap-1.5 text-white/70">
        <span>⭐</span>
        <span className="font-medium">{vitals.affirmation}</span>
      </div>
    </div>
  );
}

function StatItem({ icon, label, sub, dotColor }: { icon: string; label: string; sub: string; dotColor?: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-base">{icon}</span>
      <div className="leading-tight">
        <div className="font-display font-bold text-[12.5px] flex items-center gap-1.5">
          {dotColor && <span className="w-1.5 h-1.5 rounded-full pulse-soft" style={{ background: dotColor }} />}
          {label}
        </div>
        <div className="text-[9.5px] uppercase tracking-wide text-white/40">{sub}</div>
      </div>
    </div>
  );
}
