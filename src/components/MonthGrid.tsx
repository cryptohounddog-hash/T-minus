import type { CalendarEvent } from '../types';
import { todayISODate } from '../utils/date';

const WEEKDAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

function toISO(y: number, m: number, d: number): string {
  return `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
}

export default function MonthGrid({
  monthDate,
  events,
  onSelectDate,
  selectedDate,
  compact = false,
}: {
  monthDate: Date;
  events: CalendarEvent[];
  onSelectDate?: (iso: string) => void;
  selectedDate?: string;
  compact?: boolean;
}) {
  const y = monthDate.getFullYear();
  const m = monthDate.getMonth();
  const firstDay = new Date(y, m, 1).getDay();
  const daysInMonth = new Date(y, m + 1, 0).getDate();
  const daysInPrevMonth = new Date(y, m, 0).getDate();
  const today = todayISODate();

  const eventsByDate = new Map<string, CalendarEvent[]>();
  for (const e of events) {
    const arr = eventsByDate.get(e.date) ?? [];
    arr.push(e);
    eventsByDate.set(e.date, arr);
  }

  const cells: { label: number; iso: string; inMonth: boolean }[] = [];
  for (let i = firstDay - 1; i >= 0; i--) {
    cells.push({ label: daysInPrevMonth - i, iso: '', inMonth: false });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ label: d, iso: toISO(y, m, d), inMonth: true });
  }
  while (cells.length % 7 !== 0) {
    cells.push({ label: cells.length, iso: '', inMonth: false });
  }

  return (
    <div>
      <div className="grid grid-cols-7 mb-1">
        {WEEKDAYS.map((wd) => (
          <div key={wd} className="text-center text-[8.5px] text-white/35 font-semibold py-1">
            {compact ? wd[0] : wd}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-y-0.5">
        {cells.map((c, i) => {
          const isToday = c.inMonth && c.iso === today;
          const isSelected = c.inMonth && c.iso === selectedDate;
          const dayEvents = c.inMonth ? eventsByDate.get(c.iso) ?? [] : [];
          return (
            <button
              key={i}
              disabled={!c.inMonth}
              onClick={() => c.inMonth && onSelectDate?.(c.iso)}
              className={`flex flex-col items-center justify-center gap-0.5 rounded-md mx-auto transition-colors ${
                compact ? 'text-[10px] w-7 h-7' : 'text-[12px] w-9 h-9'
              } ${c.inMonth ? 'text-white/75' : 'text-white/15'} ${onSelectDate && c.inMonth ? 'hover:bg-white/10 cursor-pointer' : ''}`}
              style={
                isToday
                  ? { border: '1.5px solid var(--accent)', color: 'var(--accent)' }
                  : isSelected
                    ? { background: 'color-mix(in srgb, var(--accent) 25%, transparent)' }
                    : undefined
              }
            >
              <span>{c.label}</span>
              {dayEvents.length > 0 && (
                <span className="flex gap-0.5">
                  {dayEvents.slice(0, 3).map((e) => (
                    <span
                      key={e.id}
                      className="block rounded-full"
                      style={{ width: 3, height: 3, background: e.color ?? 'var(--accent)' }}
                    />
                  ))}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
