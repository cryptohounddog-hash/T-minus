import type { Widget } from '../../types';
import WidgetShell from './WidgetShell';

export function QuoteWidget({ widget }: { widget: Widget }) {
  return (
    <WidgetShell widget={widget} bare>
      <div className="h-full flex flex-col items-center justify-center text-center px-5 gap-2">
        <span className="text-2xl" style={{ color: 'var(--accent)' }}>
          ❝
        </span>
        <p className="text-[13.5px] italic text-white/85 leading-snug">{widget.text}</p>
        {widget.author && <p className="text-[11px] text-white/40">— {widget.author}</p>}
      </div>
    </WidgetShell>
  );
}

export function TextWidget({ widget }: { widget: Widget }) {
  return (
    <WidgetShell widget={widget}>
      <p className="text-[13px] text-white/75 leading-relaxed whitespace-pre-line">{widget.text}</p>
    </WidgetShell>
  );
}

export function ImageWidget({ widget }: { widget: Widget }) {
  return (
    <WidgetShell widget={widget} bare>
      {widget.imageUrl ? (
        <img src={widget.imageUrl} alt={widget.title} className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-white/30 text-[12px]">No image set</div>
      )}
    </WidgetShell>
  );
}
