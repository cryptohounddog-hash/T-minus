import { useMemo } from 'react';
import { GridLayout, useContainerWidth } from 'react-grid-layout';
import type { Layout } from 'react-grid-layout';
import { useStore } from '../store/useStore';
import WidgetShell from '../components/widgets/WidgetShell';
import WidgetContent from '../components/widgets/WidgetRenderer';
import StatusBar from '../components/StatusBar';
import { GRID_COLS, ROW_HEIGHT, GRID_MARGIN } from '../utils/layout';

export default function Dashboard() {
  const { widgets, text, designMode, bulkUpdateLayout } = useStore();
  const visible = useMemo(() => widgets.filter((w) => !w.hidden), [widgets]);
  const today = new Date().toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' });
  const { width, containerRef, mounted } = useContainerWidth({ measureBeforeMount: true });

  const layout: Layout = useMemo(
    () =>
      visible.map((w) => ({
        i: w.id,
        x: w.layout.x,
        y: w.layout.y,
        w: w.layout.w,
        h: w.layout.h,
        minW: 2,
        minH: 4,
      })),
    [visible]
  );

  function handleLayoutChange(newLayout: Layout) {
    bulkUpdateLayout(newLayout.map((item) => ({ id: item.i, layout: { x: item.x, y: item.y, w: item.w, h: item.h } })));
  }

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
          Design mode is on — drag any widget to move it anywhere, drag its bottom-right corner to resize, and use × to hide it. Click "Done Editing" when finished.
        </div>
      )}

      <div ref={containerRef}>
        {mounted && visible.length > 0 && (
          <GridLayout
            width={width}
            layout={layout}
            onLayoutChange={handleLayoutChange}
            gridConfig={{ cols: GRID_COLS, rowHeight: ROW_HEIGHT, margin: [GRID_MARGIN, GRID_MARGIN], containerPadding: [0, 0] }}
            dragConfig={{ enabled: designMode, cancel: '.no-drag' }}
            resizeConfig={{ enabled: designMode, handles: ['se'] }}
          >
            {visible.map((widget) => (
              <WidgetShell key={widget.id} widget={widget}>
                <WidgetContent widget={widget} />
              </WidgetShell>
            ))}
          </GridLayout>
        )}
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
