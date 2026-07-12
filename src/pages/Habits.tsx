import { useState } from 'react';
import { useStore } from '../store/useStore';

const DOW = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

export default function Habits() {
  const { habits, toggleHabitToday, addHabit, removeHabit } = useStore();
  const [newLabel, setNewLabel] = useState('');
  const [newIcon, setNewIcon] = useState('✨');

  const completedToday = habits.filter((h) => h.completedToday).length;
  const bestStreak = habits.reduce((max, h) => Math.max(max, h.streak), 0);

  function submit() {
    if (!newLabel.trim()) return;
    addHabit({ label: newLabel.trim(), icon: newIcon || '✨' });
    setNewLabel('');
    setNewIcon('✨');
  }

  const todayIdx = new Date().getDay();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-5 text-[12px] text-white/60 flex-wrap">
        <span>
          <b className="font-display" style={{ color: 'var(--accent)' }}>
            {completedToday}/{habits.length}
          </b>{' '}
          done today
        </span>
        <span>
          Best streak: <b className="font-display" style={{ color: 'var(--accent)' }}>{bestStreak} days</b>
        </span>
      </div>

      <div className="panel rounded-2xl p-4 flex items-center gap-2 flex-wrap">
        <input type="text" className="max-w-[70px] text-center" value={newIcon} onChange={(e) => setNewIcon(e.target.value)} />
        <input
          type="text"
          placeholder="New habit, e.g. Drink Water"
          value={newLabel}
          onChange={(e) => setNewLabel(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && submit()}
          className="flex-1 min-w-[180px]"
        />
        <button className="btn-solid" onClick={submit}>
          + Add Habit
        </button>
      </div>

      <div className="flex flex-col gap-2.5">
        {habits.map((h) => (
          <div key={h.id} className="panel rounded-xl p-3.5 flex items-center gap-3 flex-wrap">
            <span className="text-xl w-8 text-center shrink-0">{h.icon}</span>
            <div className="min-w-[120px] flex-1">
              <div className="text-[13px] font-semibold">{h.label}</div>
              <div className="text-[10.5px] text-white/40 flex items-center gap-1">
                🔥 {h.streak} day{h.streak === 1 ? '' : 's'} streak
              </div>
            </div>
            <div className="flex gap-1 shrink-0">
              {DOW.map((d, i) => (
                <div
                  key={i}
                  className="w-6 h-6 rounded-md flex items-center justify-center text-[9px]"
                  style={
                    i === todayIdx && h.completedToday
                      ? { background: 'var(--accent)', color: '#04030a', fontWeight: 700 }
                      : i <= todayIdx
                        ? { background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.35)' }
                        : { background: 'rgba(255,255,255,0.03)', color: 'rgba(255,255,255,0.15)' }
                  }
                >
                  {d}
                </div>
              ))}
            </div>
            <button
              className="btn shrink-0"
              style={h.completedToday ? { background: 'var(--accent)', color: '#04030a', borderColor: 'var(--accent)' } : undefined}
              onClick={() => toggleHabitToday(h.id)}
            >
              {h.completedToday ? '✓ Done Today' : 'Mark Done'}
            </button>
            <button className="text-[10px] w-6 h-6 rounded-md border border-red-400/30 text-red-300 hover:bg-red-500/20 shrink-0" onClick={() => removeHabit(h.id)}>
              ×
            </button>
          </div>
        ))}
        {habits.length === 0 && <div className="panel rounded-2xl p-8 text-center text-white/50">No habits yet. Add your first one above.</div>}
      </div>
    </div>
  );
}
