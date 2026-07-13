import React from "react";
import { useStore } from "../store.js";

export default function Sidebar() {
  const text = useStore((s) => s.text);
  const profile = useStore((s) => s.profile);
  const navItems = useStore((s) => s.navItems);
  const activePage = useStore((s) => s.activePage);
  const setActivePage = useStore((s) => s.setActivePage);

  const xpPct = Math.min(100, Math.round((profile.xp / profile.xpMax) * 100));

  return (
    <aside className="sidebar master-sidebar">
      <button className="sidebar-brand" onClick={() => setActivePage("dashboard")}>
        <span className="sidebar-brand-emoji">{text.brandEmoji}</span>
        <div>
          <div className="sidebar-brand-name font-display glow-text" style={{ color: "var(--accent)" }}>
            {text.sidebarBrand}
          </div>
          <div className="sidebar-brand-sub">{text.sidebarSubtitle}</div>
        </div>
      </button>

      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={"sidebar-nav-btn" + (item.id === activePage ? " active" : "")}
            onClick={() => setActivePage(item.id)}
          >
            <span className="sidebar-nav-icon">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-spacer" />

      <div className="mission-box panel master-side-mission">
        <div className="mission-box-label">You are in</div>
        <div className="mission-box-title font-display accent-gradient-text">{text.missionBoxTitle}</div>
        <div className="mission-box-text">{text.missionBoxText}</div>
        <div style={{ fontSize: 22 }}>🚀</div>
      </div>

      <button className="profile-btn" onClick={() => setActivePage("settings")}>
        <div className="profile-avatar">
          {profile.image ? <img src={profile.image} alt={profile.name} /> : <span>{profile.emoji}</span>}
          <div className="profile-level-badge">{profile.level}</div>
        </div>
        <div style={{ minWidth: 0, flex: 1 }}>
          <div className="profile-name">{profile.name}</div>
          <div className="profile-title">{profile.title}</div>
        </div>
      </button>

      <div>
        <div className="xp-row">
          <span className="font-display" style={{ color: "var(--accent)", fontWeight: 700 }}>
            LEVEL {profile.level}
          </span>
          <span>
            {profile.xp.toLocaleString()} / {profile.xpMax.toLocaleString()} XP
          </span>
        </div>
        <div className="xp-track">
          <div className="xp-fill" style={{ width: `${xpPct}%` }} />
        </div>
        {text.progressLabel && (
          <div style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", marginTop: 4 }}>
            Next: {text.progressLabel}
          </div>
        )}
      </div>
    </aside>
  );
}
