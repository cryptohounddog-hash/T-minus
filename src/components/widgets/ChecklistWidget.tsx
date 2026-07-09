import { useStore } from '../../store/useStore';
import type { Widget } from '../../types';

export default function ChecklistWidget({ widget }: { widget: Widget }) {
  const { toggleChecklistItem } = useStore();
  const items = widget.items ?? [];
  const done = items.filter((i) => i.done).length;

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 flex flex-col gap-1.5 overflow-y-auto">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => toggleChecklistItem(widget.id, item.id)}
            className="flex items-center gap-2 text-left group/item"
          >
            <span
              className="w-4 h-4 rounded-[5px] border flex items-center justify-center shrink-0 text-[10px] transition-colors"
              style={
                item.done
                  ? { background: 'var(--w-accent)', borderColor: 'var(--w-accent)', color: '#04030a' }
                  : { borderColor: 'rgba(255,255,255,0.3)' }
              }
            >
              {item.done && '✓'}
            </span>
            <span className={`text-[12.5px] ${item.done ? 'line-through text-white/35' : 'text-white/80'}`}>
              {item.label}
            </span>
          </button>
        ))}
      </div>
      <div className="pt-2 mt-1 border-t border-white/10 text-[10px] text-white/40 flex items-center justify-between">
        <span>
          {done}/{items.length} complete
        </span>
        {done === items.length && items.length > 0 && (
          <span className="font-semibold" style={{ color: 'var(--w-accent)' }}>
            Complete & Level Up! ✨
          </span>
        )}
      </div>
    </div>
  );
}
