import type { Widget } from '../../types';

export default function NinetyDayWidget({ widget }: { widget: Widget }) {
  const total = widget.totalDays ?? 90;
  const start = widget.startDate ? new Date(widget.startDate) : new Date();
  const now = new Date();
  const dayNumber = Math.min(
    total,
    Math.max(1, Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1)
  );
  const remaining = Math.max(0, total - dayNumber);
  const pct = Math.min(100, Math.round((dayNumber / total) * 100));
  const nextCheckpoint = Math.ceil(dayNumber / 30) * 30;

  return (
    <div className="flex flex-col h-full justify-between gap-2">
      <div className="flex items-end gap-3">
        <div>
          <div className="font-display font-black text-[28px] leading-none glow-text" style={{ color: 'var(--w-accent)' }}>
            {remaining}
          </div>
          <div className="text-[9.5px] uppercase tracking-wide text-white/40">Days Remaining</div>
        </div>
        <div className="text-[11px] text-white/45 pb-1">Day {dayNumber} of {total}</div>
      </div>
      <div>
        <div className="h-2 rounded-full bg-white/10 overflow-hidden">
          <div
            className="h-full rounded-full"
            style={{ width: `${pct}%`, background: 'linear-gradient(90deg, var(--w-accent), var(--accent-3))' }}
          />
        </div>
        <div className="flex items-center justify-between text-[10px] mt-1">
          <span className="font-semibold" style={{ color: 'var(--w-accent)' }}>
            {pct}% Complete
          </span>
          <span className="text-white/40">🚩 Next: Day {Math.min(nextCheckpoint, total)}</span>
        </div>
      </div>
    </div>
  );
}
