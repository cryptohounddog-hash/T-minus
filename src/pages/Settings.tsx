import { useRef, useState } from 'react';
import { useStore } from '../store/useStore';
import Field from '../components/Field';
import { readFileAsDataURL } from '../utils/file';
import ThemesModal from '../components/ThemesModal';

type Tab = 'general' | 'profile' | 'colors' | 'widgets' | 'data';

const TABS: { id: Tab; label: string; icon: string }[] = [
  { id: 'general', label: 'Dashboard Text', icon: '📝' },
  { id: 'profile', label: 'Profile', icon: '🧑' },
  { id: 'colors', label: 'Colors & Theme', icon: '🎨' },
  { id: 'widgets', label: 'Widgets & Layout', icon: '🧩' },
  { id: 'data', label: 'Data', icon: '💾' },
];

export default function Settings() {
  const [tab, setTab] = useState<Tab>('general');
  const [themesOpen, setThemesOpen] = useState(false);

  return (
    <div className="grid gap-4" style={{ gridTemplateColumns: '210px 1fr' }}>
      <div className="panel rounded-2xl p-2 h-fit flex flex-col gap-1">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-[12px] font-semibold text-left"
            style={
              tab === t.id
                ? { background: 'color-mix(in srgb, var(--accent) 16%, transparent)', color: 'var(--accent)' }
                : { color: 'rgba(255,255,255,0.6)' }
            }
          >
            <span>{t.icon}</span> {t.label}
          </button>
        ))}
        <button
          onClick={() => setThemesOpen(true)}
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-[12px] font-semibold text-left mt-1 border-t border-white/10 pt-3"
        >
          <span>🚀</span> Switch Template
        </button>
      </div>

      <div className="panel rounded-2xl p-5">
        {tab === 'general' && <GeneralTab />}
        {tab === 'profile' && <ProfileTab />}
        {tab === 'colors' && <ColorsTab />}
        {tab === 'widgets' && <WidgetsTab />}
        {tab === 'data' && <DataTab />}
      </div>

      {themesOpen && <ThemesModal onClose={() => setThemesOpen(false)} />}
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h3 className="font-display font-bold text-[13px] mb-3" style={{ color: 'var(--accent)' }}>{children}</h3>;
}

function GeneralTab() {
  const { text, updateText } = useStore();
  return (
    <div className="flex flex-col gap-6">
      <div>
        <SectionTitle>Dashboard Header</SectionTitle>
        <div className="grid grid-cols-2 gap-3">
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

      <div>
        <SectionTitle>Sidebar Branding</SectionTitle>
        <div className="grid grid-cols-3 gap-3">
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

      <div>
        <SectionTitle>Mission Mode Box</SectionTitle>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Box Title">
            <input type="text" value={text.missionBoxTitle} onChange={(e) => updateText({ missionBoxTitle: e.target.value })} />
          </Field>
          <Field label="Box Text">
            <input type="text" value={text.missionBoxText} onChange={(e) => updateText({ missionBoxText: e.target.value })} />
          </Field>
        </div>
      </div>

      <div>
        <SectionTitle>Sidebar Progress</SectionTitle>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Progress Label (Next: ...)">
            <input type="text" value={text.progressLabel} onChange={(e) => updateText({ progressLabel: e.target.value })} />
          </Field>
          <Field label="Progress Text">
            <input type="text" value={text.progressText} onChange={(e) => updateText({ progressText: e.target.value })} />
          </Field>
        </div>
      </div>

      <div>
        <SectionTitle>Quote / Scripture Banner</SectionTitle>
        <div className="grid grid-cols-1 gap-3">
          <Field label="Quote Text">
            <textarea rows={2} value={text.quote} onChange={(e) => updateText({ quote: e.target.value })} />
          </Field>
          <Field label="Author / Reference">
            <input type="text" value={text.quoteAuthor} onChange={(e) => updateText({ quoteAuthor: e.target.value })} />
          </Field>
        </div>
      </div>
    </div>
  );
}

function ProfileTab() {
  const { profile, updateProfile, vitals, updateVitals } = useStore();
  const fileRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <SectionTitle>Profile</SectionTitle>
        <div className="flex items-center gap-4 mb-4">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center text-2xl overflow-hidden shrink-0"
            style={{ border: '2px solid var(--accent)', background: 'rgba(255,255,255,0.05)' }}
          >
            {profile.image ? <img src={profile.image} alt="" className="w-full h-full object-cover" /> : profile.emoji}
          </div>
          <div className="flex items-center gap-2">
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
              className="hidden"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (file) updateProfile({ image: await readFileAsDataURL(file) });
              }}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
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

      <div>
        <SectionTitle>Status Bar (bottom of dashboard)</SectionTitle>
        <div className="grid grid-cols-2 gap-3">
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

function ColorsTab() {
  const { theme, updateTheme } = useStore();
  return (
    <div>
      <SectionTitle>Theme Colors</SectionTitle>
      <div className="grid grid-cols-2 gap-4 max-w-md">
        <ColorField label="Accent (Primary)" value={theme.accent} onChange={(v) => updateTheme({ accent: v })} />
        <ColorField label="Secondary Color" value={theme.accent2} onChange={(v) => updateTheme({ accent2: v })} />
        <ColorField label="Third Color" value={theme.accent3} onChange={(v) => updateTheme({ accent3: v })} />
        <ColorField label="Background Start" value={theme.bgFrom} onChange={(v) => updateTheme({ bgFrom: v })} />
        <ColorField label="Background End" value={theme.bgTo} onChange={(v) => updateTheme({ bgTo: v })} />
      </div>
      <p className="text-[11px] text-white/35 mt-4 max-w-md">
        Colors apply instantly across the sidebar, widgets, and buttons. Individual widgets can also have their own accent color set
        when you add or edit them.
      </p>
    </div>
  );
}

function ColorField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <Field label={label}>
      <div className="flex items-center gap-2">
        <input type="color" value={value} onChange={(e) => onChange(e.target.value)} />
        <input type="text" value={value} onChange={(e) => onChange(e.target.value)} />
      </div>
    </Field>
  );
}

function WidgetsTab() {
  const { widgets, showWidget, hideWidget, resetLayout } = useStore();
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <SectionTitle>Widgets on Dashboard</SectionTitle>
        <button className="btn" onClick={resetLayout}>
          ↺ Reset Widget Layout
        </button>
      </div>
      <div className="flex flex-col gap-2">
        {widgets.map((w) => (
          <div key={w.id} className="flex items-center justify-between px-3 py-2 rounded-lg bg-white/5">
            <span className="flex items-center gap-2 text-[12.5px] min-w-0">
              <span>{w.icon}</span>
              <span className="truncate">{w.title}</span>
              <span className="text-white/30 text-[10px] uppercase shrink-0">{w.size}</span>
            </span>
            <label className="flex items-center gap-2 text-[11px] text-white/50 shrink-0">
              {w.hidden ? 'Hidden' : 'Visible'}
              <input type="checkbox" className="checkbox-pill" checked={!w.hidden} onChange={() => (w.hidden ? showWidget(w.id) : hideWidget(w.id))} />
            </label>
          </div>
        ))}
        {widgets.length === 0 && <div className="text-white/40 text-[12px]">No widgets yet.</div>}
      </div>
    </div>
  );
}

const EXPORT_KEYS = [
  'template',
  'theme',
  'text',
  'profile',
  'navItems',
  'widgets',
  'events',
  'habits',
  'journal',
  'achievements',
  'resources',
  'friends',
  'messages',
  'vitals',
] as const;

function DataTab() {
  const [importMsg, setImportMsg] = useState('');

  function exportData() {
    const full = useStore.getState();
    const appState = Object.fromEntries(EXPORT_KEYS.map((k) => [k, full[k]]));
    const blob = new Blob([JSON.stringify(appState, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 't-minus-dashboard-backup.json';
    a.click();
    URL.revokeObjectURL(url);
  }

  function importData(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result as string);
        const patch = Object.fromEntries(EXPORT_KEYS.filter((k) => k in data).map((k) => [k, data[k]]));
        useStore.setState({ ...patch, activePage: 'dashboard', designMode: false });
        setImportMsg('Dashboard imported successfully.');
      } catch {
        setImportMsg('That file could not be read. Make sure it is a T-Minus backup JSON file.');
      }
    };
    reader.readAsText(file);
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <SectionTitle>Backup & Restore</SectionTitle>
        <p className="text-[11.5px] text-white/40 mb-3 max-w-md">
          Your dashboard is saved automatically in this browser (localStorage). Export a backup file if you want to move it to
          another device, or import a previous backup.
        </p>
        <div className="flex items-center gap-2">
          <button className="btn-solid" onClick={exportData}>
            ⬇ Export Dashboard
          </button>
          <label className="btn cursor-pointer">
            ⬆ Import Dashboard
            <input type="file" accept="application/json" className="hidden" onChange={importData} />
          </label>
        </div>
        {importMsg && <p className="text-[11px] text-white/50 mt-2">{importMsg}</p>}
      </div>
      <div>
        <SectionTitle>About This Version</SectionTitle>
        <p className="text-[11.5px] text-white/40 max-w-md leading-relaxed">
          This is a prototype of T-Minus Dashboard. Everything is stored locally in your browser — clearing site data or
          switching devices will reset your dashboard. A full product version would add real accounts, cloud sync, and
          multi-device support.
        </p>
      </div>
    </div>
  );
}
