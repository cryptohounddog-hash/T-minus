import type { ReactNode } from 'react';
import { useStore } from '../../store/useStore';
import type { Widget, WidgetSize } from '../../types';

const SPANS: Record<WidgetSize, { col: number; row: number }> = {
  sm: { col: 3, row: 1 },
  md: { col: 4, row: 1 },
  wide: { col: 6, row: 1 },
  lg: { col: 8, row: 1 },
  tall: { col: 4, row: 2 },
};

export function widgetGridStyle(size: WidgetSize): React.CSSProperties {
  const s = SPANS[size];
  return { gridColumn: `span ${s.col}`, gridRow: `span ${s.row}` };
}

export default function WidgetShell({
  widget,
  children,
  bare = false,
  footer,
}: {
  widget: Widget;
  children: ReactNode;
  bare?: boolean;
  footer?: ReactNode;
}) {
  const { designMode, moveWidget, cycleWidgetSize, hideWidget } = useStore();
  const accent = widget.accent ?? 'var(--accent)';

  return (
    <div
      style={{ ...widgetGridStyle(widget.size), ['--w-accent' as string]: accent }}
      className="relative group"
    >
      <div
        className="panel h-full flex flex-col overflow-hidden"
        style={{ borderColor: 'color-mix(in srgb, var(--w-accent) 38%, transparent)' }}
      >
        {!bare && (
          <div className="flex items-center gap-2 px-4 pt-3.5 pb-1">
            <span className="text-base leading-none" style={{ color: 'var(--w-accent)' }}>
              {widget.icon}
            </span>
            <div className="min-w-0">
              <div className="text-[12px] font-display font-bold uppercase tracking-wide leading-tight line-clamp-2" style={{ color: 'var(--w-accent)' }}>
                {widget.title}
              </div>
              {widget.subtitle && <div className="text-[10.5px] text-white/40 truncate">{widget.subtitle}</div>}
            </div>
          </div>
        )}
        <div className={bare ? 'flex-1 min-h-0' : 'flex-1 min-h-0 px-4 pb-3.5 pt-1'}>{children}</div>
        {footer && <div className="px-4 pb-3.5">{footer}</div>}
      </div>

      {designMode && (
        <div className="absolute inset-0 rounded-2xl bg-black/55 backdrop-blur-[1px] flex items-center justify-center gap-1.5 z-20">
          <button
            title="Move left"
            className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-sm flex items-center justify-center"
            onClick={() => moveWidget(widget.id, 'left')}
          >
            ←
          </button>
          <button
            title="Resize"
            className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-sm flex items-center justify-center"
            onClick={() => cycleWidgetSize(widget.id)}
          >
            ↔
          </button>
          <button
            title="Move right"
            className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-sm flex items-center justify-center"
            onClick={() => moveWidget(widget.id, 'right')}
          >
            →
          </button>
          <button
            title="Hide widget"
            className="w-8 h-8 rounded-lg bg-red-500/20 hover:bg-red-500/35 border border-red-400/40 text-sm flex items-center justify-center text-red-200"
            onClick={() => hideWidget(widget.id)}
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
}
