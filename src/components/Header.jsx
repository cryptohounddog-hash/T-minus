import React, { useEffect, useRef, useState } from "react";
import { useStore } from "../store.js";
import { PAGE_META } from "../pageMeta.js";
import WidgetModal from "./WidgetModal.jsx";
import ThemesModal from "./ThemesModal.jsx";

export default function Header() {
  const text = useStore((s) => s.text);
  const activePage = useStore((s) => s.activePage);
  const designMode = useStore((s) => s.designMode);
  const toggleDesignMode = useStore((s) => s.toggleDesignMode);
  const resetLayout = useStore((s) => s.resetLayout);

  const [showAdd, setShowAdd] = useState(false);
  const [showThemes, setShowThemes] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function onDocClick(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  const isDashboard = activePage === "dashboard";
  const meta = PAGE_META[activePage];

  return (
    <>
      <div className="page-header master-header">
        <div>
          {isDashboard ? (
            <>
              <h1 className="page-title font-display accent-gradient-text">{text.title}</h1>
              <p className="page-subtitle">{text.subtitle}</p>
            </>
          ) : (
            <>
              <h1 className="page-title font-display accent-gradient-text" style={{ textTransform: "uppercase", fontSize: 24 }}>
                {meta?.label ?? activePage}
              </h1>
              <p className="page-subtitle">{meta?.tagline}</p>
            </>
          )}
        </div>

        {isDashboard && (
          <div className="header-actions">
            <button className="btn" onClick={() => setShowAdd(true)}>
              + Add Widget
            </button>
            <button className="btn" onClick={() => setShowThemes(true)}>
              🎨 Themes
            </button>
            <button
              className="btn"
              onClick={toggleDesignMode}
              style={designMode ? { background: "var(--accent)", color: "#04030a", borderColor: "var(--accent)" } : undefined}
            >
              {designMode ? "✓ Done Editing" : "✏️ Design Widgets"}
            </button>
            <div className="dropdown" ref={menuRef}>
              <button className="btn" style={{ padding: "9px 12px" }} onClick={() => setMenuOpen((m) => !m)}>
                •••
              </button>
              {menuOpen && (
                <div className="dropdown-menu panel panel-glow">
                  <button
                    className="dropdown-item"
                    onClick={() => {
                      resetLayout();
                      setMenuOpen(false);
                    }}
                  >
                    ↺ Reset Widget Layout
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {isDashboard && designMode && (
        <div className="design-banner">
          Design mode is on — drag any widget to move it, drag its bottom-right corner to resize, and use × to
          hide it or ✎ to edit it. Click "Done Editing" when finished.
        </div>
      )}

      {showAdd && <WidgetModal mode="add" onClose={() => setShowAdd(false)} />}
      {showThemes && <ThemesModal onClose={() => setShowThemes(false)} />}
    </>
  );
}
