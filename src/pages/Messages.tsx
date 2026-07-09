import { useStore } from '../store/useStore';

export default function Messages() {
  const { messages, toggleMessageRead } = useStore();
  const unreadCount = messages.filter((m) => m.unread).length;

  return (
    <div className="flex flex-col gap-4">
      <div className="text-[12.5px] text-white/55">
        <span className="font-display font-bold" style={{ color: 'var(--accent)' }}>
          {unreadCount}
        </span>{' '}
        unread message{unreadCount === 1 ? '' : 's'}
      </div>

      <div className="flex flex-col gap-2">
        {messages.map((m) => (
          <button
            key={m.id}
            onClick={() => toggleMessageRead(m.id)}
            className="panel rounded-xl p-3.5 flex items-center gap-3 text-left"
            style={m.unread ? { borderColor: 'color-mix(in srgb, var(--accent) 45%, transparent)' } : undefined}
          >
            <span className="text-xl shrink-0">{m.avatar}</span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-[12.5px] font-semibold truncate">{m.from}</span>
                {m.unread && <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: 'var(--accent)' }} />}
              </div>
              <div className="text-[11px] text-white/45 truncate">{m.preview}</div>
            </div>
            <span className="text-[10px] text-white/30 shrink-0">{m.time}</span>
          </button>
        ))}
        {messages.length === 0 && <div className="panel rounded-2xl p-8 text-center text-white/50">No messages yet.</div>}
      </div>
    </div>
  );
}
