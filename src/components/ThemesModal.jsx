import React, { useState } from "react";
import Modal, { Field } from "./Modal.jsx";
import { useStore } from "../store.js";
import { BUILTIN_THEMES } from "../data.js";

const TEMPLATES = [
  { id: "adult", label: "Adult Mission Control", tagline: "Clean, futuristic command center for professionals, pastors & builders.", accent: "#22d3ee", emoji: "🚀" },
  { id: "student", label: "Student Starpath", tagline: "Bright, playful dashboard for teens and students.", accent: "#ec4899", emoji: "🌙" },
];

function sameColors(a, b) {
  return a.accent === b.accent && a.accent2 === b.accent2 && a.accent3 === b.accent3 && a.bgFrom === b.bgFrom && a.bgTo === b.bgTo;
}

export default function ThemesModal({ onClose }) {
  const template = useStore((s) => s.template);
  const theme = useStore((s) => s.theme);
  const applyTemplate = useStore((s) => s.applyTemplate);
  const customThemes = useStore((s) => s.customThemes);
  const saveCustomTheme = useStore((s) => s.saveCustomTheme);
  const deleteCustomTheme = useStore((s) => s.deleteCustomTheme);
  const updateTheme = useStore((s) => s.updateTheme);

  const [confirmSwitch, setConfirmSwitch] = useState(null);
  const [showSaveForm, setShowSaveForm] = useState(false);
  const [newName, setNewName] = useState("");
  const [newEmoji, setNewEmoji] = useState("🎨");

  const allThemes = [...BUILTIN_THEMES, ...customThemes];

  return (
    <Modal title="Themes" onClose={onClose} width={720}>
      <div className="settings-section">
        <h3>Color Themes</h3>
        <p style={{ fontSize: 11.5, color: "rgba(255,255,255,0.45)", marginBottom: 12 }}>
          Applying a color theme only changes accent/background colors — your widgets, text, and layout stay
          exactly as they are. Save your current colors any time to build your own theme.
        </p>
        <div className="theme-grid">
          {allThemes.map((t) => {
            const active = sameColors(t.colors, theme);
            return (
              <div key={t.id} className="theme-card panel" style={{ borderColor: active ? t.colors.accent : undefined }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 16 }}>{t.emoji}</span>
                  <span style={{ fontWeight: 700, fontSize: 12.5 }}>{t.name}</span>
                  {active && (
                    <span className="theme-badge" style={{ background: t.colors.accent, color: "#04030a" }}>
                      Active
                    </span>
                  )}
                </div>
                <div className="theme-swatches">
                  <span className="theme-swatch" style={{ background: t.colors.accent }} />
                  <span className="theme-swatch" style={{ background: t.colors.accent2 }} />
                  <span className="theme-swatch" style={{ background: t.colors.accent3 }} />
                </div>
                <div style={{ display: "flex", gap: 6 }}>
                  <button className="btn" style={{ flex: 1 }} disabled={active} onClick={() => applyThemeColors(t)}>
                    {active ? "In Use" : "Apply"}
                  </button>
                  {!t.builtin && (
                    <button className="btn-icon danger" onClick={() => deleteCustomTheme(t.id)} title="Delete theme">
                      ×
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {!showSaveForm ? (
          <button className="btn" onClick={() => setShowSaveForm(true)}>
            + Save Current Colors as New Theme
          </button>
        ) : (
          <div className="panel" style={{ padding: 12, display: "flex", gap: 8, alignItems: "flex-end", flexWrap: "wrap" }}>
            <Field label="Emoji" hint={null}>
              <input type="text" style={{ width: 60, textAlign: "center" }} value={newEmoji} onChange={(e) => setNewEmoji(e.target.value)} />
            </Field>
            <div style={{ flex: 1, minWidth: 160 }}>
              <Field label="Theme name">
                <input type="text" placeholder="e.g. Sunset Run" value={newName} onChange={(e) => setNewName(e.target.value)} />
              </Field>
            </div>
            <button
              className="btn-solid"
              disabled={!newName.trim()}
              onClick={() => {
                saveCustomTheme(newName.trim(), newEmoji.trim() || "🎨");
                setNewName("");
                setNewEmoji("🎨");
                setShowSaveForm(false);
              }}
            >
              Save Theme
            </button>
            <button className="btn" onClick={() => setShowSaveForm(false)}>
              Cancel
            </button>
          </div>
        )}
      </div>

      <div className="settings-section">
        <h3>Templates</h3>
        <p style={{ fontSize: 11.5, color: "rgba(255,255,255,0.45)", marginBottom: 12 }}>
          Switching templates replaces your sidebar sections and starter widgets — this is a bigger change than a
          color theme and will replace your current dashboard content.
        </p>
        <div className="theme-grid">
          {TEMPLATES.map((t) => {
            const active = t.id === template;
            return (
              <div key={t.id} className="theme-card panel" style={{ borderColor: active ? t.accent : undefined, boxShadow: active ? `0 0 20px -6px ${t.accent}` : undefined }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                  <span style={{ fontSize: 20 }}>{t.emoji}</span>
                  <span className="font-display" style={{ fontWeight: 700, fontSize: 13.5 }}>
                    {t.label}
                  </span>
                  {active && (
                    <span className="theme-badge" style={{ background: t.accent, color: "#04030a" }}>
                      Active
                    </span>
                  )}
                </div>
                <p style={{ fontSize: 11.5, color: "rgba(255,255,255,0.45)", lineHeight: 1.4, marginBottom: 10 }}>{t.tagline}</p>
                {confirmSwitch === t.id ? (
                  <div style={{ display: "flex", gap: 6 }}>
                    <button
                      className="btn-solid"
                      style={{ flex: 1 }}
                      onClick={() => {
                        applyTemplate(t.id);
                        onClose();
                      }}
                    >
                      Confirm Switch
                    </button>
                    <button className="btn" onClick={() => setConfirmSwitch(null)}>
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button className="btn" style={{ width: "100%" }} disabled={active} onClick={() => setConfirmSwitch(t.id)}>
                    {active ? "Currently Active" : "Switch to This Template"}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </Modal>
  );

  function applyThemeColors(t) {
    updateTheme(t.colors);
  }
}
