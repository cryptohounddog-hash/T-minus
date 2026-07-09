import type { Widget } from '../../types';
import WidgetShell from './WidgetShell';

function formatValue(v: number, unit?: string): string {
  if (unit === '$') return `$${v.toLocaleString()}`;
  return v.toLocaleString();
}

export default function ProgressWidget({ widget }: { widget: Widget }) {
  const current = widget.current ?? 0;
  const target = widget.target ?? 100;
  const pct = Math.min(100, Math.round((current / (target || 1)) * 100));

  return (
    <WidgetShell widget={widget}>
      <div className="flex flex-col h-full justify-between gap-2">
        <div>
          <div className="flex items-baseline gap-1.5">
            <span className="font-display font-black text-[24px] tabular glow-text" style={{ color: 'var(--w-accent)' }}>
              {formatValue(current, widget.unit)}
            </span>
            <span className="text-[12px] text-white/40">
              {widget.unit === '$' ? `of ${formatValue(target, widget.unit)} goal` : `/ ${formatValue(target, widget.unit)}`}
            </span>
          </div>
          {widget.unit && widget.unit !== '$' && <div className="text-[10.5px] text-white/40">{widget.unit}</div>}
        </div>

        <div>
          <div className="h-2 rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full rounded-full transition-all"
              style={{ width: `${pct}%`, background: 'linear-gradient(90deg, var(--w-accent), var(--accent-3))' }}
            />
          </div>
          <div className="text-right text-[10px] mt-1 font-semibold" style={{ color: 'var(--w-accent)' }}>
            {pct}%
          </div>
        </div>

        {widget.extraValue && (
          <div className="pt-1.5 border-t border-white/10">
            {widget.extraLabel && <div className="text-[9px] uppercase tracking-wide text-white/35">{widget.extraLabel}</div>}
            <div className="text-[12px] font-semibold truncate">{widget.extraValue}</div>
            {widget.extraSub && <div className="text-[10.5px] text-white/40 truncate">{widget.extraSub}</div>}
          </div>
        )}
      </div>
    </WidgetShell>
  );
}
