import { useState } from 'react';
import { useStore } from '../../store/useStore';
import MonthGrid from '../MonthGrid';
import { formatMonthYear } from '../../utils/date';

export default function CalendarWidget() {
  const { events, setActivePage } = useStore();
  const [cursor, setCursor] = useState(new Date());

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-1.5">
        <button
          className="no-drag w-5 h-5 rounded flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10"
          onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1))}
        >
          ‹
        </button>
        <span className="text-[11px] font-display font-bold" style={{ color: 'var(--w-accent)' }}>
          {formatMonthYear(cursor)}
        </span>
        <button
          className="no-drag w-5 h-5 rounded flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10"
          onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1))}
        >
          ›
        </button>
      </div>
      <MonthGrid monthDate={cursor} events={events} compact />
      <button
        className="no-drag mt-auto pt-2 text-[10px] font-semibold flex items-center gap-1 self-start"
        style={{ color: 'var(--w-accent)' }}
        onClick={() => setActivePage('calendar')}
      >
        View Full Calendar <span>→</span>
      </button>
    </div>
  );
}
