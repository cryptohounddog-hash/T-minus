import { Children, forwardRef, type ReactNode, type CSSProperties, type HTMLAttributes } from 'react';
import { useStore } from '../../store/useStore';
import type { Widget } from '../../types';

const BARE_TYPES = new Set(['clock', 'quote', 'image']);

interface WidgetShellProps extends HTMLAttributes<HTMLDivElement> {
  widget: Widget;
  children: ReactNode;
  style?: CSSProperties;
}

const WidgetShell = forwardRef<HTMLDivElement, WidgetShellProps>(function WidgetShell(
  { widget, children, className, style, ...rest },
  ref
) {
  const { designMode, hideWidget } = useStore();
  const accent = widget.accent ?? 'var(--accent)';
  const bare = BARE_TYPES.has(widget.type);

  // react-grid-layout's resize handles are injected by cloning this element and
  // appending extra nodes onto its `children` prop (see react-resizable's
  // Resizable.js: `children: [...original children, ...resizeHandles]`). The
  // real widget content is always the first child; anything after it is a
  // resize handle. Those handles must render as *direct* children of the root
  // div below (matching the library's `.react-grid-item > .react-resizable-handle`
  // CSS selector) and outside the pointer-events-none content wrapper, or
  // they end up unstyled, unpositioned, and unclickable.
  const childArray = Children.toArray(children);
  const [content, ...resizeHandles] = childArray;

  return (
    <div
      ref={ref}
      className={`${className ?? ''} group`.trim()}
      style={{ ...style, ['--w-accent' as string]: accent }}
      {...rest}
    >
      <div
        className={`panel h-full w-full flex flex-col overflow-hidden ${designMode ? 'cursor-grab active:cursor-grabbing' : ''}`}
        style={{ borderColor: 'color-mix(in srgb, var(--w-accent) 38%, transparent)' }}
      >
        {!bare && (
          <div className="flex items-center gap-2 px-4 pt-3.5 pb-1 shrink-0">
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
        <div
          className={`${bare ? 'flex-1 min-h-0' : 'flex-1 min-h-0 px-4 pb-3.5 pt-1'} ${designMode ? 'pointer-events-none select-none' : ''}`}
        >
          {content}
        </div>
      </div>

      {designMode && (
        <>
          <div className="absolute inset-0 rounded-2xl bg-black/25 pointer-events-none z-10" />
          <button
            title="Hide widget"
            className="no-drag absolute top-2 right-2 w-7 h-7 rounded-lg bg-red-500/25 hover:bg-red-500/45 border border-red-400/50 text-sm flex items-center justify-center text-red-100 z-20"
            onMouseDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation();
              hideWidget(widget.id);
            }}
          >
            ×
          </button>
        </>
      )}

      {resizeHandles}
    </div>
  );
});

export default WidgetShell;
