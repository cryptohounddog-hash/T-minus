import { useState } from 'react';
import { useStore } from '../store/useStore';
import { formatFriendlyDate, todayISODate } from '../utils/date';

const MOODS = ['💪', '🙏', '😊', '😬', '😔', '🎉', '🎵', '📚'];

export default function Journal() {
  const { journal, addJournalEntry, removeJournalEntry } = useStore();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [mood, setMood] = useState('💪');

  function submit() {
    if (!title.trim() && !body.trim()) return;
    addJournalEntry({ title: title.trim() || 'Untitled Entry', body: body.trim(), mood, date: todayISODate() });
    setTitle('');
    setBody('');
    setMood('💪');
    setOpen(false);
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <p className="text-[12.5px] text-white/50">Reflection, gratitude, prayers, and lessons learned.</p>
        <button className="btn-solid" onClick={() => setOpen((v) => !v)}>
          {open ? 'Cancel' : '+ New Entry'}
        </button>
      </div>

      {open && (
        <div className="panel rounded-2xl p-4 flex flex-col gap-2.5">
          <input type="text" placeholder="Entry title" value={title} onChange={(e) => setTitle(e.target.value)} />
          <textarea rows={4} placeholder="What's on your mind?" value={body} onChange={(e) => setBody(e.target.value)} />
          <div className="flex items-center gap-1.5 flex-wrap">
            {MOODS.map((m) => (
              <button
                key={m}
                onClick={() => setMood(m)}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-base"
                style={mood === m ? { background: 'var(--accent)', boxShadow: '0 0 10px var(--accent)' } : { background: 'rgba(255,255,255,0.06)' }}
              >
                {m}
              </button>
            ))}
          </div>
          <button className="btn-solid self-start" onClick={submit}>
            Save Entry
          </button>
        </div>
      )}

      <div className="flex flex-col gap-3">
        {journal.map((j) => (
          <div key={j.id} className="panel rounded-2xl p-4">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-lg shrink-0">{j.mood}</span>
                <div className="min-w-0">
                  <div className="text-[13.5px] font-display font-bold truncate">{j.title}</div>
                  <div className="text-[10.5px] text-white/40">{formatFriendlyDate(j.date)}</div>
                </div>
              </div>
              <button className="text-white/30 hover:text-red-300 shrink-0" onClick={() => removeJournalEntry(j.id)}>
                ×
              </button>
            </div>
            {j.body && <p className="text-[12.5px] text-white/70 mt-2 leading-relaxed whitespace-pre-line">{j.body}</p>}
          </div>
        ))}
        {journal.length === 0 && <div className="panel rounded-2xl p-8 text-center text-white/50">No journal entries yet.</div>}
      </div>
    </div>
  );
}
