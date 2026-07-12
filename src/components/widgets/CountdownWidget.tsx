import { useNow } from '../../hooks/useNow';
import { getCountdownParts, pad2, formatFriendlyDate, formatTime } from '../../utils/date';
import type { Widget } from '../../types';

function TimeBlock({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center min-w-0">
      <span className="font-display font-black tabular text-[22px] leading-none glow-text" style={{ color: 'var(--w-accent)' }}>
        {pad2(value)}
      </span>
      <span className="text-[8.5px] tracking-[0.14em] text-white/40 mt-1">{label}</span>
    </div>
  );
}

export function CountdownBody({ widget }: { widget: Widget }) {
  const now = useNow();
  if (!widget.targetDate) return null;
  const { days, hours, minutes, seconds, isPast } = getCountdownParts(widget.targetDate, now);
  const hasProgress = widget.current !== undefined && widget.target !== undefined;
  const pct = hasProgress ? Math.min(100, Math.round(((widget.current ?? 0) / (widget.target || 1)) * 100)) : null;

  return (
    <div className="flex flex-col h-full justify-between gap-2">
      <div className="flex items-center justify-between gap-1">
        <TimeBlock value={days} label="DAYS" />
        <span className="text-white/20 font-display pb-3">:</span>
        <TimeBlock value={hours} label="HRS" />
        <span className="text-white/20 font-display pb-3">:</span>
        <TimeBlock value={minutes} label="MINS" />
        <span className="text-white/20 font-display pb-3">:</span>
        <TimeBlock value={seconds} label="SECS" />
      </div>
      {isPast && <div className="text-[10px] text-amber-300/80">This moment has arrived!</div>}
      <div className="flex items-center gap-1.5 text-[10.5px] text-white/45">
        <span>📅</span>
        <span>{formatFriendlyDate(widget.targetDate)}</span>
        {widget.targetDate.slice(11, 16) !== '00:00' && (
          <>
            <span>•</span>
            <span>🕐 {formatTime(widget.targetDate)}</span>
          </>
        )}
      </div>
      {hasProgress && (
        <div>
          <div className="flex items-center justify-between text-[10px] text-white/45 mb-1">
            <span>{widget.extraLabel ?? 'Progress'}</span>
            <span className="tabular font-semibold" style={{ color: 'var(--w-accent)' }}>
              {pct}%
            </span>
          </div>
          <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full rounded-full"
              style={{ width: `${pct}%`, background: 'linear-gradient(90deg, var(--w-accent), var(--accent-3))' }}
            />
          </div>
        </div>
      )}
      {widget.ctaLabel && (
        <button className="text-[10.5px] font-semibold flex items-center gap-1 mt-auto" style={{ color: 'var(--w-accent)' }}>
          {widget.ctaLabel} <span>→</span>
        </button>
      )}
    </div>
  );
}

