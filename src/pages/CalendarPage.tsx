import { useState } from 'react';
import { useStore } from '../store/useStore';
import MonthGrid from '../components/MonthGrid';
import { formatMonthYear, todayISODate } from '../utils/date';

export default function CalendarPage() {
  const { events, addEvent, removeEvent } = useStore();
  const [cursor, setCursor] = useState(new Date());
  const [selected, setSelected] = useState(todayISODate());
  const [form, setForm] = useState({ title: '', time: '' });

  const dayEvents = events.filter((e) => e.date === selected).sort((a, b) => (a.time ?? '').localeCompare(b.time ?? ''));
  const upcoming = [...events]
    .filter((e) => e.date >= todayISODate())
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 8);

  function submit() {
    if (!form.title.trim()) return;
    addEvent({ date: selected, title: form.title.trim(), time: form.time, color: 'var(--accent)' });
    setForm({ title: '', time: '' });
  }

  return (
    <div className="grid gap-4" style={{ gridTemplateColumns: '1.5fr 1fr' }}>
      <div className="panel rounded-2xl p-5">
        <div className="flex items-center justify-between mb-4">
          <button className="btn px-3" onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1))}>
            ‹
          </button>
          <span className="font-display font-bold text-[16px]" style={{ color: 'var(--accent)' }}>
            {formatMonthYear(cursor)}
          </span>
          <button className="btn px-3" onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1))}>
            ›
          </button>
        </div>
        <MonthGrid monthDate={cursor} events={events} onSelectDate={setSelected} selectedDate={selected} />
      </div>

      <div className="flex flex-col gap-4">
        <div className="panel rounded-2xl p-4">
          <div className="text-[11px] uppercase tracking-wide text-white/40 mb-2 font-display font-bold">
            {new Date(selected + 'T00:00:00').toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
          </div>
          <div className="flex flex-col gap-2 mb-3">
            {dayEvents.map((e) => (
              <div key={e.id} className="flex items-center justify-between gap-2 px-3 py-2 rounded-lg bg-white/5">
                <div className="min-w-0">
                  <div className="text-[12.5px] truncate">{e.title}</div>
                  {e.time && <div className="text-[10px] text-white/40">{e.time}</div>}
                </div>
                <button className="text-white/30 hover:text-red-300 shrink-0" onClick={() => removeEvent(e.id)}>
                  ×
                </button>
              </div>
            ))}
            {dayEvents.length === 0 && <div className="text-[11.5px] text-white/35">No events this day.</div>}
          </div>
          <div className="flex flex-col gap-2 pt-3 border-t border-white/10">
            <input type="text" placeholder="Event title" value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} />
            <div className="flex gap-2">
              <input type="time" value={form.time} onChange={(e) => setForm((f) => ({ ...f, time: e.target.value }))} />
              <button className="btn-solid shrink-0" onClick={submit}>
                + Add
              </button>
            </div>
          </div>
        </div>

        <div className="panel rounded-2xl p-4">
          <div className="text-[11px] uppercase tracking-wide text-white/40 mb-2 font-display font-bold">Upcoming</div>
          <div className="flex flex-col gap-2">
            {upcoming.map((e) => (
              <div key={e.id} className="flex items-center justify-between text-[12px]">
                <span className="truncate">{e.title}</span>
                <span className="text-white/40 shrink-0 ml-2">{new Date(e.date + 'T00:00:00').toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
              </div>
            ))}
            {upcoming.length === 0 && <div className="text-[11.5px] text-white/35">Nothing upcoming.</div>}
          </div>
        </div>
      </div>
    </div>
  );
}
