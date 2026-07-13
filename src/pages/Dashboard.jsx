import React, { useMemo } from "react";
import GridLayout from "react-grid-layout";
import { useStore } from "../store.js";
import WidgetCard from "../components/WidgetCard.jsx";
import StatusBar from "../components/StatusBar.jsx";
import useContainerWidth from "../useContainerWidth.js";

export default function Dashboard() {
  const widgets = useStore((s) => s.widgets);
  const text = useStore((s) => s.text);
  const designMode = useStore((s) => s.designMode);
  const bulkUpdateLayout = useStore((s) => s.bulkUpdateLayout);

  const visible = useMemo(() => widgets.filter((w) => !w.hidden), [widgets]);
  const { ref, width } = useContainerWidth();

  const rglLayout = useMemo(
    () => visible.map((w) => ({ i: w.id, x: w.layout.x, y: w.layout.y, w: w.layout.w, h: w.layout.h, minW: 2, minH: 4 })),
    [visible]
  );

  function onLayoutChange(layout) {
    bulkUpdateLayout(layout.map((l) => ({ id: l.i, layout: { x: l.x, y: l.y, w: l.w, h: l.h } })));
  }

  const todayLabel = new Date().toLocaleDateString(undefined, { month: "long", day: "numeric", year: "numeric" });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div className="panel master-status" style={{ padding: "10px 20px", display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap", fontSize: 12, color: "rgba(255,255,255,0.6)" }}>
        <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ color: "var(--accent)" }}>◈</span> {text.focusToday}
        </span>
        <span style={{ color: "rgba(255,255,255,0.2)" }}>|</span>
        <span>Today is {todayLabel}</span>
        <span style={{ color: "rgba(255,255,255,0.2)" }}>|</span>
        <span>{text.welcomeMessage} 💗</span>
      </div>

      <div className="master-grid-holder" ref={ref}>
        {width > 0 && visible.length > 0 && (
          <GridLayout
            className="layout"
            layout={rglLayout}
            cols={12}
            rowHeight={20}
            width={width}
            margin={[10, 10]}
            containerPadding={[0, 0]}
            isDraggable={designMode}
            isResizable={designMode}
            draggableCancel=".no-drag"
            onLayoutChange={onLayoutChange}
            compactType="vertical"
            resizeHandles={["se"]}
          >
            {visible.map((w) => (
              <WidgetCard key={w.id} widget={w} />
            ))}
          </GridLayout>
        )}
        {visible.length === 0 && (
          <div className="grid-empty panel">
            No widgets on your dashboard yet. Click <span style={{ color: "var(--accent)" }}>+ Add Widget</span> to
            get started.
          </div>
        )}
      </div>

      <div className="quote-banner panel master-quote">
        <span className="quote-mark">❝</span>
        <p>{text.quote}</p>
        {text.quoteAuthor && <p className="quote-author">— {text.quoteAuthor}</p>}
      </div>

      <StatusBar />
    </div>
  );
}
