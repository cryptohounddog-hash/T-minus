import { useState } from 'react';
import Modal from './Modal';
import { useStore } from '../store/useStore';
import type { TemplateId } from '../types';

const TEMPLATES: { id: TemplateId; label: string; tagline: string; accent: string; emoji: string }[] = [
  { id: 'adult', label: 'Adult Mission Control', tagline: 'Clean, futuristic command center for professionals, pastors & builders.', accent: '#22d3ee', emoji: '🚀' },
  { id: 'student', label: 'Student Starpath', tagline: 'Bright, playful dashboard for teens and students.', accent: '#ec4899', emoji: '🌙' },
];

const COMING_SOON = [
  { label: 'Pastor / Ministry', emoji: '⛪' },
  { label: 'Business Launch', emoji: '💼' },
  { label: 'Fitness Challenge', emoji: '💪' },
  { label: 'Family Dashboard', emoji: '👨‍👩‍👧‍👦' },
  { label: 'Wedding Countdown', emoji: '💍' },
  { label: 'Holiday Dashboard', emoji: '🎄' },
];

export default function ThemesModal({ onClose }: { onClose: () => void }) {
  const { template, applyTemplate } = useStore();
  const [confirming, setConfirming] = useState<TemplateId | null>(null);

  return (
    <Modal title="Choose a Template" onClose={onClose} width="max-w-2xl">
      <p className="text-[12.5px] text-white/50 mb-4">
        Switching templates applies a full preset (colors, sidebar sections, and starter widgets). This replaces your current
        dashboard content.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
        {TEMPLATES.map((t) => {
          const active = t.id === template;
          return (
            <div
              key={t.id}
              className="rounded-xl p-4 panel"
              style={{ borderColor: active ? t.accent : 'rgba(255,255,255,0.12)', boxShadow: active ? `0 0 20px -6px ${t.accent}` : undefined }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">{t.emoji}</span>
                <span className="font-display font-bold text-[13.5px]">{t.label}</span>
                {active && (
                  <span className="text-[9px] uppercase tracking-wide px-1.5 py-0.5 rounded-full ml-auto" style={{ background: t.accent, color: '#04030a' }}>
                    Active
                  </span>
                )}
              </div>
              <p className="text-[11.5px] text-white/45 leading-snug mb-3">{t.tagline}</p>
              {confirming === t.id ? (
                <div className="flex items-center gap-2">
                  <button
                    className="btn-solid flex-1"
                    onClick={() => {
                      applyTemplate(t.id);
                      onClose();
                    }}
                  >
                    Confirm Switch
                  </button>
                  <button className="btn" onClick={() => setConfirming(null)}>
                    Cancel
                  </button>
                </div>
              ) : (
                <button className="btn w-full" disabled={active} onClick={() => setConfirming(t.id)}>
                  {active ? 'Currently Active' : 'Switch to This Template'}
                </button>
              )}
            </div>
          );
        })}
      </div>

      <div className="text-[10.5px] uppercase tracking-wide text-white/35 mb-2">Coming Soon</div>
      <div className="grid grid-cols-3 gap-2">
        {COMING_SOON.map((t) => (
          <div key={t.label} className="rounded-lg p-2.5 text-center border border-white/10 opacity-45">
            <div className="text-base">{t.emoji}</div>
            <div className="text-[10px] mt-1 leading-tight">{t.label}</div>
          </div>
        ))}
      </div>
    </Modal>
  );
}
