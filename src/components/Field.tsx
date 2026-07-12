import type { ReactNode } from 'react';

export default function Field({ label, children, hint }: { label: string; children: ReactNode; hint?: string }) {
  return (
    <label className="block">
      <span className="block text-[10.5px] uppercase tracking-wide text-white/40 mb-1">{label}</span>
      {children}
      {hint && <span className="block text-[10px] text-white/30 mt-1">{hint}</span>}
    </label>
  );
}
