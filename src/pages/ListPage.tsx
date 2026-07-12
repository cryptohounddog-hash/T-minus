import { useState } from 'react';
import { useStore } from '../store/useStore';

export default function ListPage({ kind }: { kind: 'resources' | 'friends' }) {
  const { resources, friends, addListItem, removeListItem } = useStore();
  const items = kind === 'resources' ? resources : friends;
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [icon, setIcon] = useState(kind === 'resources' ? '🔖' : '🙂');

  function submit() {
    if (!title.trim()) return;
    addListItem(kind, { title: title.trim(), subtitle: subtitle.trim(), icon: icon || (kind === 'resources' ? '🔖' : '🙂') });
    setTitle('');
    setSubtitle('');
    setIcon(kind === 'resources' ? '🔖' : '🙂');
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="panel rounded-2xl p-4 flex items-center gap-2 flex-wrap">
        <input type="text" className="max-w-[60px] text-center" value={icon} onChange={(e) => setIcon(e.target.value)} />
        <input
          type="text"
          placeholder={kind === 'resources' ? 'Resource title' : 'Friend name'}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="flex-1 min-w-[160px]"
        />
        <input
          type="text"
          placeholder={kind === 'resources' ? 'Description (optional)' : 'Note (optional)'}
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
          className="flex-1 min-w-[160px]"
        />
        <button className="btn-solid" onClick={submit}>
          + Add
        </button>
      </div>

      <div className="grid gap-3" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))' }}>
        {items.map((item) => (
          <div key={item.id} className="panel rounded-xl p-3.5 flex items-center gap-3">
            <span className="text-xl shrink-0">{item.icon}</span>
            <div className="min-w-0 flex-1">
              <div className="text-[12.5px] font-semibold truncate">{item.title}</div>
              {item.subtitle && <div className="text-[10.5px] text-white/40 truncate">{item.subtitle}</div>}
            </div>
            <button className="text-white/30 hover:text-red-300 shrink-0" onClick={() => removeListItem(kind, item.id)}>
              ×
            </button>
          </div>
        ))}
        {items.length === 0 && <div className="panel rounded-2xl p-8 text-center text-white/50 col-span-full">Nothing here yet.</div>}
      </div>
    </div>
  );
}
