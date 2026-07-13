import React, { useRef, useState } from "react";
import { useStore } from "../store.js";
import { Field } from "../components/Modal.jsx";
import ThemesModal from "../components/ThemesModal.jsx";

const TABS = [
  { id: "general", label: "Dashboard Text", icon: "📝" },
  { id: "profile", label: "Profile", icon: "🧑" },
  { id: "colors", label: "Colors & Theme", icon: "🎨" },
  { id: "widgets", label: "Widgets & Layout", icon: "🧩" },
  { id: "data", label: "Data", icon: "💾" },
];

const PERSISTED_KEYS = [
  "template",
  "theme",
  "customThemes",
  "text",
  "profile",
  "navItems",
  "widgets",
  "events",
  "habits",
  "journal",
  "achievements",
  "resources",
  "friends",
  "messages",
  "vitals",
];

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function Settings() {
  const [tab, setTab] = useState("general");
  const [showThemes, setShowThemes] = useState(false);

  return (
    <div className="settings-shell">
      <div className="settings-nav panel">
        {TABS.map((t) => (
          <button key={t.id} className={tab === t.id ? "active" : ""} onClick={() => setTab(t.id)}>
            <span>{t.icon}</span> {t.label}
          </button>
        ))}
        <button style={{ marginTop: 6, borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 10 }} onClick={() => setShowThemes(true)}>
          <span>🚀</span> Switch Template
        </button>
      </div>

      <div className="settings-panel panel">
        {tab === "general" && <GeneralTab />}
        {tab === "profile" && <ProfileTab />}
        {tab === "colors" && <ColorsTab onOpenThemes={() => setShowThemes(true)} />}
        {tab === "widgets" && <WidgetsTab />}
        {tab === "data" && <DataTab />}
      </div>

      {showThemes && <ThemesModal onClose={() => setShowThemes(false)} />}
    </div>
  );
}

function SectionTitle({ children }) {
  return (
    <h3 className="font-display" style={{ fontSize: 13, fontWeight: 700, color: "var(--accent)", marginBottom: 12 }}>
      {children}
    </h3>
  );
}

function GeneralTab() {
  const text = useStore((s) => s.text);
  const updateText = useStore((s) => s.updateText);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div className="settings-section">
        <SectionTitle>Dashboard Header</SectionTitle>
        <div className="field-row">
          <Field label="Dashboard Title">
            <input type="text" value={text.title} onChange={(e) => updateText({ title: e.target.value })} />
          </Field>
          <Field label="Subtitle">
            <input type="text" value={text.subtitle} onChange={(e) => updateText({ subtitle: e.target.value })} />
          </Field>
          <Field label="Welcome Message">
            <input type="text" value={text.welcomeMessage} onChange={(e) => updateText({ welcomeMessage: e.target.value })} />
          </Field>
          <Field label="Focus Today Line">
            <input type="text" value={text.focusToday} onChange={(e) => updateText({ focusToday: e.target.value })} />
          </Field>
        </div>
      </div>

      <div className="settings-section">
        <SectionTitle>Sidebar Branding</SectionTitle>
        <div className="field-row-3">
          <Field label="Brand Emoji">
            <input type="text" value={text.brandEmoji} onChange={(e) => updateText({ brandEmoji: e.target.value })} />
          </Field>
          <Field label="Sidebar Brand Name">
            <input type="text" value={text.sidebarBrand} onChange={(e) => updateText({ sidebarBrand: e.target.value })} />
          </Field>
          <Field label="Sidebar Subtitle">
            <input type="text" value={text.sidebarSubtitle} onChange={(e) => updateText({ sidebarSubtitle: e.target.value })} />
          </Field>
        </div>
      </div>

      <div className="settings-section">
        <SectionTitle>Mission Mode Box</SectionTitle>
        <div className="field-row">
          <Field label="Box Title">
            <input type="text" value={text.missionBoxTitle} onChange={(e) => updateText({ missionBoxTitle: e.target.value })} />
          </Field>
          <Field label="Box Text">
            <input type="text" value={text.missionBoxText} onChange={(e) => updateText({ missionBoxText: e.target.value })} />
          </Field>
        </div>
      </div>

      <div className="settings-section">
        <SectionTitle>Sidebar Progress</SectionTitle>
        <div className="field-row">
          <Field label="Progress Label (Next: ...)">
            <input type="text" value={text.progressLabel} onChange={(e) => updateText({ progressLabel: e.target.value })} />
          </Field>
          <Field label="Progress Text">
            <input type="text" value={text.progressText} onChange={(e) => updateText({ progressText: e.target.value })} />
          </Field>
        </div>
      </div>

      <div className="settings-section">
        <SectionTitle>Quote / Scripture Banner</SectionTitle>
        <Field label="Quote Text">
          <textarea rows={2} value={text.quote} onChange={(e) => updateText({ quote: e.target.value })} />
        </Field>
        <Field label="Author / Reference">
          <input type="text" value={text.quoteAuthor} onChange={(e) => updateText({ quoteAuthor: e.target.value })} />
        </Field>
      </div>
    </div>
  );
}

function ProfileTab() {
  const profile = useStore((s) => s.profile);
  const updateProfile = useStore((s) => s.updateProfile);
  const vitals = useStore((s) => s.vitals);
  const updateVitals = useStore((s) => s.updateVitals);
  const fileRef = useRef(null);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div className="settings-section">
        <SectionTitle>Profile</SectionTitle>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
          <div className="profile-avatar" style={{ width: 64, height: 64 }}>
            {profile.image ? <img src={profile.image} alt="" /> : <span style={{ fontSize: 24 }}>{profile.emoji}</span>}
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button className="btn" onClick={() => fileRef.current?.click()}>
              Upload Image
            </button>
            {profile.image && (
              <button className="btn" onClick={() => updateProfile({ image: null })}>
                Remove
              </button>
            )}
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (file) updateProfile({ image: await readFileAsDataUrl(file) });
              }}
            />
          </div>
        </div>
        <div className="field-row-3">
          <Field label="Name">
            <input type="text" value={profile.name} onChange={(e) => updateProfile({ name: e.target.value })} />
          </Field>
          <Field label="Title">
            <input type="text" value={profile.title} onChange={(e) => updateProfile({ title: e.target.value })} />
          </Field>
          <Field label="Emoji (used if no image)">
            <input type="text" value={profile.emoji} onChange={(e) => updateProfile({ emoji: e.target.value })} />
          </Field>
          <Field label="Level">
            <input type="number" value={profile.level} onChange={(e) => updateProfile({ level: Number(e.target.value) })} />
          </Field>
          <Field label="Current XP">
            <input type="number" value={profile.xp} onChange={(e) => updateProfile({ xp: Number(e.target.value) })} />
          </Field>
          <Field label="XP to Next Level">
            <input type="number" value={profile.xpMax} onChange={(e) => updateProfile({ xpMax: Number(e.target.value) })} />
          </Field>
        </div>
      </div>

      <div className="settings-section">
        <SectionTitle>Status Bar</SectionTitle>
        <div className="field-row-3">
          <Field label="Streak Days">
            <input type="number" value={vitals.streakDays} onChange={(e) => updateVitals({ streakDays: Number(e.target.value) })} />
          </Field>
          <Field label="Focus Level (0-100)">
            <input type="number" min={0} max={100} value={vitals.focusLevel} onChange={(e) => updateVitals({ focusLevel: Number(e.target.value) })} />
          </Field>
          <Field label="Energy %">
            <input type="number" min={0} max={100} value={vitals.energyPercent} onChange={(e) => updateVitals({ energyPercent: Number(e.target.value) })} />
          </Field>
          <Field label="System Status Text">
            <input type="text" value={vitals.systemStatus} onChange={(e) => updateVitals({ systemStatus: e.target.value })} />
          </Field>
          <Field label="Affirmation">
            <input type="text" value={vitals.affirmation} onChange={(e) => updateVitals({ affirmation: e.target.value })} />
          </Field>
        </div>
      </div>
    </div>
  );
}

function ColorsTab({ onOpenThemes }) {
  const theme = useStore((s) => s.theme);
  const updateTheme = useStore((s) => s.updateTheme);
  const saveCustomTheme = useStore((s) => s.saveCustomTheme);
  const [name, setName] = useState("");
  const [emoji, setEmoji] = useState("🎨");

  return (
    <div>
      <SectionTitle>Theme Colors</SectionTitle>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, maxWidth: 420 }}>
        <ColorField label="Accent (Primary)" value={theme.accent} onChange={(v) => updateTheme({ accent: v })} />
        <ColorField label="Secondary Color" value={theme.accent2} onChange={(v) => updateTheme({ accent2: v })} />
        <ColorField label="Third Color" value={theme.accent3} onChange={(v) => updateTheme({ accent3: v })} />
        <ColorField label="Background Start" value={theme.bgFrom} onChange={(v) => updateTheme({ bgFrom: v })} />
        <ColorField label="Background End" value={theme.bgTo} onChange={(v) => updateTheme({ bgTo: v })} />
      </div>

      <div style={{ marginTop: 20, paddingTop: 16, borderTop: "1px solid rgba(255,255,255,0.1)" }}>
        <p style={{ fontSize: 11.5, color: "rgba(255,255,255,0.4)", marginBottom: 10 }}>
          Happy with these colors? Save them as a named theme you can switch back to any time — from here or the
          Themes button on your dashboard.
        </p>
        <div style={{ display: "flex", gap: 8, alignItems: "flex-end", flexWrap: "wrap" }}>
          <div style={{ width: 70 }}>
            <Field label="Emoji">
              <input type="text" style={{ textAlign: "center" }} value={emoji} onChange={(e) => setEmoji(e.target.value)} />
            </Field>
          </div>
          <div style={{ flex: 1, minWidth: 160 }}>
            <Field label="Theme name">
              <input type="text" placeholder="e.g. Sunset Run" value={name} onChange={(e) => setName(e.target.value)} />
            </Field>
          </div>
          <button
            className="btn-solid"
            disabled={!name.trim()}
            onClick={() => {
              saveCustomTheme(name.trim(), emoji.trim() || "🎨");
              setName("");
              setEmoji("🎨");
            }}
          >
            Save Theme
          </button>
          <button className="btn" onClick={onOpenThemes}>
            View All Themes
          </button>
        </div>
      </div>
    </div>
  );
}

function ColorField({ label, value, onChange }) {
  return (
    <Field label={label}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <input type="color" value={value} onChange={(e) => onChange(e.target.value)} />
        <input type="text" value={value} onChange={(e) => onChange(e.target.value)} />
      </div>
    </Field>
  );
}

function WidgetsTab() {
  const widgets = useStore((s) => s.widgets);
  const showWidget = useStore((s) => s.showWidget);
  const hideWidget = useStore((s) => s.hideWidget);
  const resetLayout = useStore((s) => s.resetLayout);

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
        <SectionTitle>Widgets on Dashboard</SectionTitle>
        <button className="btn" onClick={resetLayout}>
          ↺ Reset Widget Layout
        </button>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {widgets.map((w) => (
          <div key={w.id} className="item-row">
            <span style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12.5, minWidth: 0 }}>
              <span>{w.icon}</span>
              <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{w.title}</span>
              <span style={{ fontSize: 10, textTransform: "uppercase", color: "rgba(255,255,255,0.3)", flexShrink: 0 }}>{w.size}</span>
            </span>
            <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 11, color: "rgba(255,255,255,0.5)", flexShrink: 0 }}>
              {w.hidden ? "Hidden" : "Visible"}
              <input type="checkbox" className="checkbox-pill" checked={!w.hidden} onChange={() => (w.hidden ? showWidget(w.id) : hideWidget(w.id))} />
            </label>
          </div>
        ))}
        {widgets.length === 0 && <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>No widgets yet.</div>}
      </div>
    </div>
  );
}

function DataTab() {
  const [msg, setMsg] = useState("");

  function exportData() {
    const state = useStore.getState();
    const payload = Object.fromEntries(PERSISTED_KEYS.map((k) => [k, state[k]]));
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "t-minus-dashboard-backup.json";
    a.click();
    URL.revokeObjectURL(url);
  }

  function importData(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(reader.result);
        const patch = Object.fromEntries(PERSISTED_KEYS.filter((k) => k in parsed).map((k) => [k, parsed[k]]));
        useStore.setState({ ...patch, activePage: "dashboard", designMode: false });
        setMsg("Dashboard imported successfully.");
      } catch {
        setMsg("That file could not be read. Make sure it is a T-Minus backup JSON file.");
      }
    };
    reader.readAsText(file);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div className="settings-section">
        <SectionTitle>Backup & Restore</SectionTitle>
        <p style={{ fontSize: 11.5, color: "rgba(255,255,255,0.4)", marginBottom: 12, maxWidth: 440 }}>
          Your dashboard is saved automatically in this browser (localStorage). Export a backup file if you want to
          move it to another device, or import a previous backup.
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <button className="btn-solid" onClick={exportData}>
            ⬇ Export Dashboard
          </button>
          <label className="btn" style={{ cursor: "pointer" }}>
            ⬆ Import Dashboard
            <input type="file" accept="application/json" style={{ display: "none" }} onChange={importData} />
          </label>
        </div>
        {msg && <p style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", marginTop: 8 }}>{msg}</p>}
      </div>
    </div>
  );
}
