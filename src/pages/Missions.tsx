import { useState } from 'react';
import { useStore } from '../store/useStore';
import { CountdownBody } from '../components/widgets/CountdownWidget';
import { getCountdownParts } from '../utils/date';
import { useNow } from '../hooks/useNow';
import AddWidgetModal from '../components/AddWidgetModal';
import type { Widget } from '../types';

export default function Missions() {
  const { widgets, events, achievements, removeWidget, hideWidget, showWidget } = useStore();
  const [addOpen, setAddOpen] = useState(false);
  const now = useNow();

  const missionWidgets = widgets.filter((w) => w.type === 'countdown' || w.type === 'ninetyday');
  const countdowns = missionWidgets.filter((w) => w.type === 'countdown' && w.targetDate);

  const activeCount = countdowns.filter((w) => !getCountdownParts(w.targetDate!, now).isPast).length;
  const upcomingSoon = countdowns.filter((w) => {
    const p = getCountdownParts(w.targetDate!, now);
    return !p.isPast && p.days <= 14;
  }).length;
  const completedAchievements = achievements.filter((a) => a.unlocked).length;
  const totalTracked = missionWidgets.length;

  const progressable = missionWidgets.filter((w) => w.current !== undefined && w.target !== undefined);
  const overallPct = progressable.length
    ? Math.round(progressable.reduce((sum, w) => sum + Math.min(100, ((w.current ?? 0) / (w.target || 1)) * 100), 0) / progressable.length)
    : 0;

  const upcomingEvents = [...events]
    .filter((e) => e.date >= new Date().toISOString().slice(0, 10))
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 6);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 flex-wrap text-[12px] text-white/60">
          <MiniStat icon="🚀" label="Missions" value={totalTracked} />
          <MiniStat icon="⏳" label="Upcoming (14d)" value={upcomingSoon} />
          <MiniStat icon="🏆" label="Completed" value={completedAchievements} />
        </div>
        <button className="btn-solid" onClick={() => setAddOpen(true)}>
          + New Mission
        </button>
      </div>

      <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))' }}>
        {missionWidgets.map((mw) => (
          <div key={mw.id} className="panel rounded-2xl p-4 flex flex-col gap-2" style={{ borderColor: 'color-mix(in srgb, ' + (mw.accent ?? 'var(--accent)') + ' 40%, transparent)' }}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-lg">{mw.icon}</span>
                <div className="min-w-0">
                  <div className="text-[13px] font-display font-bold truncate" style={{ color: mw.accent ?? 'var(--accent)' }}>
                    {mw.title}
                  </div>
                  {mw.subtitle && <div className="text-[10.5px] text-white/40 truncate">{mw.subtitle}</div>}
                </div>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button
                  className="text-[10px] px-2 py-1 rounded-md border border-white/15 text-white/50 hover:text-white hover:bg-white/10"
                  onClick={() => (mw.hidden ? showWidget(mw.id) : hideWidget(mw.id))}
                >
                  {mw.hidden ? 'Show on Dashboard' : 'On Dashboard'}
                </button>
                <button
                  className="text-[10px] w-6 h-6 rounded-md border border-red-400/30 text-red-300 hover:bg-red-500/20"
                  onClick={() => removeWidget(mw.id)}
                >
                  ×
                </button>
              </div>
            </div>
            <div style={{ ['--w-accent' as string]: mw.accent ?? 'var(--accent)' }}>
              {mw.type === 'countdown' ? <CountdownBody widget={mw} /> : <NinetyDayInline widget={mw} />}
            </div>
          </div>
        ))}
        {missionWidgets.length === 0 && (
          <div className="panel rounded-2xl p-8 text-center text-white/50 col-span-full">
            No missions yet. Click <span style={{ color: 'var(--accent)' }}>+ New Mission</span> to add a countdown.
          </div>
        )}
      </div>

      <div className="grid gap-4" style={{ gridTemplateColumns: '1.3fr 1fr 1fr' }}>
        <div className="panel rounded-2xl p-4">
          <div className="text-[11px] uppercase tracking-wide text-white/40 mb-3 font-display font-bold">Mission Progress Overview</div>
          <div className="flex items-center gap-4">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center font-display font-black text-[16px] shrink-0"
              style={{
                background: `conic-gradient(var(--accent) ${overallPct * 3.6}deg, rgba(255,255,255,0.08) 0deg)`,
              }}
            >
              <div className="w-11 h-11 rounded-full bg-[#0b0620] flex items-center justify-center">{overallPct}%</div>
            </div>
            <div className="flex-1 flex flex-col gap-2 min-w-0">
              {progressable.slice(0, 4).map((w) => {
                const pct = Math.min(100, Math.round(((w.current ?? 0) / (w.target || 1)) * 100));
                return (
                  <div key={w.id}>
                    <div className="flex justify-between text-[10.5px] text-white/50 mb-0.5">
                      <span className="truncate">{w.title}</span>
                      <span>{pct}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${pct}%`, background: w.accent ?? 'var(--accent)' }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="panel rounded-2xl p-4">
          <div className="text-[11px] uppercase tracking-wide text-white/40 mb-3 font-display font-bold">Missions at a Glance</div>
          <GlanceRow dot="#22c55e" label="Active Missions" value={activeCount} />
          <GlanceRow dot="#f59e0b" label="Upcoming (14 days)" value={upcomingSoon} />
          <GlanceRow dot="var(--accent)" label="Completed" value={completedAchievements} />
          <GlanceRow dot="var(--accent-3)" label="Total Tracked" value={totalTracked} />
        </div>

        <div className="panel rounded-2xl p-4">
          <div className="text-[11px] uppercase tracking-wide text-white/40 mb-3 font-display font-bold">Upcoming Events</div>
          <div className="flex flex-col gap-2.5">
            {upcomingEvents.map((e) => {
              const days = Math.max(0, Math.round((new Date(e.date).getTime() - new Date(new Date().toDateString()).getTime()) / 86400000));
              return (
                <div key={e.id} className="flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <div className="text-[12px] truncate">{e.title}</div>
                    <div className="text-[10px] text-white/35">{new Date(e.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</div>
                  </div>
                  <span className="text-[10px] shrink-0" style={{ color: e.color ?? 'var(--accent)' }}>
                    {days === 0 ? 'Today' : `In ${days}d`}
                  </span>
                </div>
              );
            })}
            {upcomingEvents.length === 0 && <div className="text-[11px] text-white/35">Nothing scheduled yet.</div>}
          </div>
        </div>
      </div>

      {addOpen && <AddWidgetModal onClose={() => setAddOpen(false)} />}
    </div>
  );
}

function NinetyDayInline({ widget }: { widget: Widget }) {
  const total = widget.totalDays ?? 90;
  const start = widget.startDate ? new Date(widget.startDate) : new Date();
  const dayNumber = Math.min(total, Math.max(1, Math.floor((Date.now() - start.getTime()) / 86400000) + 1));
  const remaining = Math.max(0, total - dayNumber);
  const pct = Math.min(100, Math.round((dayNumber / total) * 100));
  return (
    <div>
      <div className="flex items-end gap-2 mb-1.5">
        <span className="font-display font-black text-[20px]" style={{ color: 'var(--w-accent)' }}>
          {remaining}
        </span>
        <span className="text-[10.5px] text-white/40 pb-0.5">days remaining · Day {dayNumber}/{total}</span>
      </div>
      <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
        <div className="h-full rounded-full" style={{ width: `${pct}%`, background: 'var(--w-accent)' }} />
      </div>
    </div>
  );
}

function MiniStat({ icon, label, value }: { icon: string; label: string; value: number }) {
  return (
    <div className="flex items-center gap-1.5">
      <span>{icon}</span>
      <span className="font-display font-bold text-white/85">{value}</span>
      <span className="text-white/40">{label}</span>
    </div>
  );
}

function GlanceRow({ dot, label, value }: { dot: string; label: string; value: number }) {
  return (
    <div className="flex items-center justify-between py-1.5 border-b border-white/5 last:border-0">
      <span className="flex items-center gap-2 text-[12px] text-white/60">
        <span className="w-1.5 h-1.5 rounded-full" style={{ background: dot }} />
        {label}
      </span>
      <span className="text-[12.5px] font-display font-bold">{value}</span>
    </div>
  );
}
