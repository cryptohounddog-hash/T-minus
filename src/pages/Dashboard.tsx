import { useStore } from '../store/useStore';
import WidgetRenderer from '../components/widgets/WidgetRenderer';
import StatusBar from '../components/StatusBar';

export default function Dashboard() {
  const { widgets, text, designMode } = useStore();
  const visible = widgets.filter((w) => !w.hidden).sort((a, b) => a.order - b.order);
  const today = new Date().toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' });

  return (
    <div className="flex flex-col gap-4">
      <div className="panel rounded-2xl px-5 py-2.5 flex items-center gap-3 flex-wrap text-[12px] text-white/60">
        <span className="flex items-center gap-1.5">
          <span style={{ color: 'var(--accent)' }}>◈</span> {text.focusToday}
        </span>
        <span className="text-white/20">|</span>
        <span>Today is {today}</span>
        <span className="text-white/20">|</span>
        <span className="flex items-center gap-1">
          {text.welcomeMessage} <span className="text-pink-300">💗</span>
        </span>
      </div>

      {designMode && (
        <div className="rounded-xl px-4 py-2 text-[12px] text-center font-medium" style={{ background: 'color-mix(in srgb, var(--accent) 14%, transparent)', border: '1px solid color-mix(in srgb, var(--accent) 40%, transparent)', color: 'var(--accent)' }}>
          Design mode is on — use the arrows to move widgets, ↔ to resize, and × to hide. Click "Done Editing" when finished.
        </div>
      )}

      <div
        className="grid gap-4"
        style={{ gridTemplateColumns: 'repeat(12, minmax(0, 1fr))', gridAutoRows: '224px', gridAutoFlow: 'row dense' }}
      >
        {visible.map((widget) => (
          <WidgetRenderer key={widget.id} widget={widget} />
        ))}
      </div>

      {visible.length === 0 && (
        <div className="panel rounded-2xl p-10 text-center text-white/50">
          No widgets on your dashboard yet. Click <span style={{ color: 'var(--accent)' }}>+ Add Widget</span> to get started.
        </div>
      )}

      <div className="panel rounded-2xl px-6 py-4 text-center">
        <span className="text-lg" style={{ color: 'var(--accent-2)' }}>
          ❝
        </span>
        <p className="text-[14px] italic text-white/80 max-w-2xl mx-auto mt-1">{text.quote}</p>
        {text.quoteAuthor && <p className="text-[11px] text-white/40 mt-1">— {text.quoteAuthor}</p>}
      </div>

      <StatusBar />
    </div>
  );
}
