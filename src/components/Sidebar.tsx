import { useStore } from '../store/useStore';

export default function Sidebar() {
  const { text, profile, navItems, activePage, setActivePage } = useStore();

  const xpPct = Math.min(100, Math.round((profile.xp / profile.xpMax) * 100));

  return (
    <aside className="w-[236px] shrink-0 h-full flex flex-col gap-4 p-4 relative z-10 overflow-y-auto">
      {/* Brand */}
      <button
        onClick={() => setActivePage('dashboard')}
        className="flex items-center gap-2.5 px-1 pt-1 pb-2 text-left"
      >
        <span className="text-2xl leading-none float-y">{text.brandEmoji}</span>
        <div className="min-w-0">
          <div className="font-display font-extrabold tracking-wide text-[15px] leading-tight truncate glow-text" style={{ color: 'var(--accent)' }}>
            {text.sidebarBrand}
          </div>
          <div className="text-[10px] tracking-[0.18em] text-white/40 uppercase truncate">{text.sidebarSubtitle}</div>
        </div>
      </button>

      {/* Nav */}
      <nav className="flex flex-col gap-1">
        {navItems.map((item) => {
          const active = item.id === activePage;
          return (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] font-semibold tracking-wide transition-all"
              style={
                active
                  ? {
                      background: 'color-mix(in srgb, var(--accent) 16%, transparent)',
                      border: '1px solid color-mix(in srgb, var(--accent) 55%, transparent)',
                      color: 'var(--accent)',
                      boxShadow: '0 0 14px -4px color-mix(in srgb, var(--accent) 70%, transparent)',
                    }
                  : { border: '1px solid transparent', color: 'rgba(255,255,255,0.62)' }
              }
            >
              <span className="text-base leading-none w-5 text-center">{item.icon}</span>
              <span className="uppercase text-[11.5px]">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="flex-1" />

      {/* Mission mode box */}
      <div className="panel rounded-xl p-3.5 text-center">
        <div className="text-[9px] tracking-[0.2em] uppercase text-white/40 mb-1">You are in</div>
        <div className="font-display font-bold text-[13px] mb-1 accent-gradient-text">{text.missionBoxTitle}</div>
        <div className="text-[11px] text-white/55 leading-snug mb-2">{text.missionBoxText}</div>
        <div className="text-2xl float-y">🚀</div>
      </div>

      {/* Profile */}
      <button onClick={() => setActivePage('settings')} className="flex items-center gap-2.5 text-left px-0.5">
        <div
          className="w-11 h-11 rounded-full flex items-center justify-center text-xl shrink-0 overflow-hidden relative"
          style={{
            border: '2px solid var(--accent)',
            boxShadow: '0 0 14px -2px color-mix(in srgb, var(--accent) 80%, transparent)',
            background: 'rgba(255,255,255,0.05)',
          }}
        >
          {profile.image ? (
            <img src={profile.image} alt={profile.name} className="w-full h-full object-cover" />
          ) : (
            <span>{profile.emoji}</span>
          )}
          <div
            className="absolute -bottom-1 -right-1 text-[9px] font-display font-bold rounded-full w-[18px] h-[18px] flex items-center justify-center px-1"
            style={{ background: 'var(--accent)', color: '#04030a' }}
          >
            {profile.level}
          </div>
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-[13px] font-semibold truncate">{profile.name}</div>
          <div className="text-[10.5px] text-white/45 truncate">{profile.title}</div>
        </div>
      </button>

      <div>
        <div className="flex items-center justify-between text-[10px] text-white/45 mb-1">
          <span className="font-display font-bold" style={{ color: 'var(--accent)' }}>
            LEVEL {profile.level}
          </span>
          <span className="tabular">
            {profile.xp.toLocaleString()} / {profile.xpMax.toLocaleString()} XP
          </span>
        </div>
        <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
          <div
            className="h-full rounded-full"
            style={{ width: `${xpPct}%`, background: 'linear-gradient(90deg, var(--accent), var(--accent-3))' }}
          />
        </div>
        {text.progressLabel && (
          <div className="text-[10px] text-white/35 mt-1 truncate">Next: {text.progressLabel}</div>
        )}
      </div>
    </aside>
  );
}
