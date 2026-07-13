import React from "react";
import { createPortal } from "react-dom";

// Rendered via a portal straight into <body>. Dashboard widgets are
// positioned by react-grid-layout using CSS transforms, and a
// transformed ancestor creates a new containing block for
// position:fixed children — without the portal, a modal opened from a
// widget would be clipped to that widget's box instead of centered
// over the whole viewport.
export default function Modal({ title, onClose, children, width = 520 }) {
  return createPortal(
    <div
      className="modal-backdrop"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal-box panel panel-glow" style={{ maxWidth: width }}>
        <div className="modal-head">
          <h2>{title}</h2>
          <button className="modal-close" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>
        <div className="modal-content">{children}</div>
      </div>
    </div>,
    document.body
  );
}

export function Field({ label, hint, children }) {
  return (
    <label className="field">
      <span className="field-label">{label}</span>
      {children}
      {hint && (
        <span style={{ display: "block", fontSize: 10, color: "rgba(255,255,255,0.3)", marginTop: 4 }}>
          {hint}
        </span>
      )}
    </label>
  );
}
