import React, { forwardRef, useState } from "react";
import { useStore } from "../store.js";
import WidgetRenderer, { HEADERLESS_TYPES } from "./WidgetRenderer.jsx";
import WidgetModal from "./WidgetModal.jsx";

// Wraps a single dashboard widget with its panel chrome plus the
// edit / hide / remove controls. forwardRef + prop passthrough is
// required because react-grid-layout clones this element to attach
// drag/resize handlers.
const WidgetCard = forwardRef(function WidgetCard({ widget, style, className, children, ...rest }, ref) {
  const designMode = useStore((s) => s.designMode);
  const hideWidget = useStore((s) => s.hideWidget);
  const [editing, setEditing] = useState(false);
  const accent = widget.accent || "var(--accent)";
  const showHeader = !HEADERLESS_TYPES.has(widget.type);

  return (
    <div
      ref={ref}
      style={{ ...style, "--w-accent": accent }}
      className={(className || "") + " widget-shell" + (designMode ? " design-mode" : "")}
      {...rest}
    >
      <div className="panel widget-panel">
        {showHeader && (
          <div className="widget-head">
            <span className="widget-head-icon">{widget.icon}</span>
            <div style={{ minWidth: 0 }}>
              <div className="widget-head-title">{widget.title}</div>
              {widget.subtitle && <div className="widget-head-subtitle">{widget.subtitle}</div>}
            </div>
          </div>
        )}
        <div className={"widget-body" + (!showHeader ? " no-pad" : "")} style={designMode ? { pointerEvents: "none", userSelect: "none" } : undefined}>
          <WidgetRenderer widget={widget} />
        </div>
      </div>

      {!designMode && (
        <div className="widget-controls">
          <button
            className="btn-icon accent no-drag"
            title="Edit widget"
            onMouseDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation();
              setEditing(true);
            }}
          >
            ✎
          </button>
          <button
            className="btn-icon no-drag"
            title="Hide from dashboard"
            onMouseDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation();
              hideWidget(widget.id);
            }}
          >
            ×
          </button>
        </div>
      )}

      {designMode && (
        <>
          <div className="widget-dim" />
          <button
            className="btn-icon accent no-drag"
            title="Edit widget"
            style={{ position: "absolute", top: 8, right: 40, zIndex: 20 }}
            onMouseDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation();
              setEditing(true);
            }}
          >
            ✎
          </button>
          <button
            className="btn-icon danger no-drag"
            title="Hide widget"
            style={{ position: "absolute", top: 8, right: 8, zIndex: 20 }}
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

      {editing && <WidgetModal mode="edit" widget={widget} onClose={() => setEditing(false)} />}
      {children}
    </div>
  );
});

export default WidgetCard;
