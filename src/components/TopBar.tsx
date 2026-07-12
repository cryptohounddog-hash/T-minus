import { useState, useRef, useEffect } from 'react';
import { useStore } from '../store/useStore';
import type { PageId } from '../types';

const PAGE_META: Partial<Record<PageId, { label: string; tagline: string }>> = {
  missions: { label: 'Mission Control', tagline: 'Your life. Your missions. Your countdown.' },
  calendar: { label: 'Calendar', tagline: 'Everything coming up, in one view.' },
  goals: { label: 'Goals', tagline: 'What you are working toward.' },
  habits: { label: 'Habits', tagline: 'Daily disciplines. Streaks. Consistency.' },
  journal: { label: 'Journal', tagline: 'Reflect. Process. Remember.' },
  achievements: { label: 'Achievements', tagline: 'Milestones you have already hit.' },
  stats: { label: 'Stats', tagline: 'The numbers behind your progress.' },
  school: { label: 'School', tagline: 'Exams, homework, and everything academic.' },
  friends: { label: 'Friends', tagline: 'The people in your corner.' },
  resources: { label: 'Resources', tagline: 'Links, docs, and study material.' },
  messages: { label: 'Messages', tagline: 'Stay in the loop.' },
  finances: { label: 'Finances', tagline: 'Track what you are building financially.' },
  settings: { label: 'Settings', tagline: 'Make this dashboard yours.' },
};

export default function TopBar({ onAddWidget, onThemes }: { onAddWidget: () => void; onThemes: () => void }) {
  const { text, activePage, designMode, toggleDesignMode, resetLayout } = useStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false);
    }
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const isDashboard = activePage === 'dashboard';
  const meta = PAGE_META[activePage];

  return (
    <div className="flex items-start justify-between gap-4 flex-wrap">
      <div>
        {isDashboard ? (
          <>
            <h1 className="font-display font-black text-[26px] leading-tight accent-gradient-text tracking-wide">
              {text.title}
            </h1>
            <p className="text-[13px] text-white/50 mt-0.5">{text.subtitle}</p>
          </>
        ) : (
          <>
            <h1 className="font-display font-black text-[24px] leading-tight accent-gradient-text tracking-wide uppercase">
              {meta?.label ?? activePage}
            </h1>
            <p className="text-[13px] text-white/50 mt-0.5">{meta?.tagline}</p>
          </>
        )}
      </div>

      {isDashboard && (
        <div className="flex items-center gap-2">
          <button className="btn" onClick={onAddWidget}>
            + Add Widget
          </button>
          <button className="btn" onClick={onThemes}>
            🎨 Themes
          </button>
          <button
            className="btn"
            onClick={toggleDesignMode}
            style={
              designMode
                ? { background: 'var(--accent)', color: '#04030a', borderColor: 'var(--accent)' }
                : undefined
            }
          >
            {designMode ? '✓ Done Editing' : '✏️ Design Widgets'}
          </button>
          <div className="relative" ref={menuRef}>
            <button className="btn px-3" onClick={() => setMenuOpen((v) => !v)}>
              •••
            </button>
            {menuOpen && (
              <div className="absolute right-0 top-[calc(100%+6px)] w-52 panel panel-glow rounded-xl p-1.5 z-30">
                <button
                  className="w-full text-left px-3 py-2 rounded-lg text-[12.5px] hover:bg-white/5 transition"
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
  );
}
