import { useState } from 'react';
import { useStore } from '../store/useStore';
import AddWidgetModal from '../components/AddWidgetModal';

const GOAL_TYPES = ['progress', 'savings', 'reading', 'study', 'ninetyday'];

export default function Goals() {
  const { widgets, updateWidget, removeWidget, activePage } = useStore();
  const [addOpen, setAddOpen] = useState(false);
  const isFinances = activePage === 'finances';

  const goalWidgets = widgets.filter((w) => GOAL_TYPES.includes(w.type) && (isFinances ? w.type === 'savings' : true));

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-end">
        <button className="btn-solid" onClick={() => setAddOpen(true)}>
          + New Goal
        </button>
      </div>

      <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
        {goalWidgets.map((g) => {
          const isNinety = g.type === 'ninetyday';
          const start = g.startDate ? new Date(g.startDate) : new Date();
          const total = g.totalDays ?? 90;
          const dayNumber = Math.min(total, Math.max(1, Math.floor((Date.now() - start.getTime()) / 86400000) + 1));
          const current = isNinety ? dayNumber : g.current ?? 0;
          const target = isNinety ? total : g.target ?? 100;
          const pct = Math.min(100, Math.round((current / (target || 1)) * 100));
          return (
            <div key={g.id} className="panel rounded-2xl p-4 flex flex-col gap-3" style={{ borderColor: 'color-mix(in srgb, ' + (g.accent ?? 'var(--accent)') + ' 40%, transparent)' }}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-lg">{g.icon}</span>
                  <div className="min-w-0">
                    <div className="text-[13px] font-display font-bold truncate" style={{ color: g.accent ?? 'var(--accent)' }}>
                      {g.title}
                    </div>
                    {g.subtitle && <div className="text-[10.5px] text-white/40 truncate">{g.subtitle}</div>}
                  </div>
                </div>
                <button className="text-[10px] w-6 h-6 rounded-md border border-red-400/30 text-red-300 hover:bg-red-500/20 shrink-0" onClick={() => removeWidget(g.id)}>
                  ×
                </button>
              </div>

              {isNinety && (
                <div className="text-[11px] text-white/40">
                  Day {current} of {target} · {Math.max(0, target - current)} days remaining
                </div>
              )}

              {!isNinety && (
                <div className="flex items-center gap-2">
                  <button className="btn px-2 py-1" onClick={() => updateWidget(g.id, { current: Math.max(0, current - 1) })}>
                    −
                  </button>
                  <input
                    type="number"
                    value={current}
                    onChange={(e) => updateWidget(g.id, { current: Number(e.target.value) })}
                    className="text-center"
                  />
                  <button className="btn px-2 py-1" onClick={() => updateWidget(g.id, { current: current + 1 })}>
                    +
                  </button>
                  <span className="text-[11px] text-white/40 shrink-0">
                    / {target} {g.unit && g.unit !== '$' ? g.unit : ''}
                  </span>
                </div>
              )}

              <div>
                <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${pct}%`, background: g.accent ?? 'var(--accent)' }} />
                </div>
                <div className="text-right text-[10.5px] mt-1 font-semibold" style={{ color: g.accent ?? 'var(--accent)' }}>
                  {pct}%
                </div>
              </div>

              <label className="flex items-center gap-2 text-[10.5px] text-white/40">
                Target
                <input
                  type="number"
                  className="w-20"
                  value={isNinety ? g.totalDays ?? 90 : target}
                  onChange={(e) => updateWidget(g.id, isNinety ? { totalDays: Number(e.target.value) } : { target: Number(e.target.value) })}
                />
              </label>
            </div>
          );
        })}
        {goalWidgets.length === 0 && (
          <div className="panel rounded-2xl p-8 text-center text-white/50 col-span-full">
            No goals yet. Click <span style={{ color: 'var(--accent)' }}>+ New Goal</span> to start tracking progress.
          </div>
        )}
      </div>

      {addOpen && <AddWidgetModal onClose={() => setAddOpen(false)} />}
    </div>
  );
}
