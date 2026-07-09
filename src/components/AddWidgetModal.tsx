import { useState } from 'react';
import Modal from './Modal';
import Field from './Field';
import { useStore } from '../store/useStore';
import type { Widget, WidgetSize, WidgetType } from '../types';
import { readFileAsDataURL } from '../utils/file';
import { makeId } from '../utils/id';

interface LibraryItem {
  type: WidgetType;
  label: string;
  icon: string;
  description: string;
  size: WidgetSize;
}

const LIBRARY: LibraryItem[] = [
  { type: 'countdown', label: 'Countdown', icon: '⏱️', description: 'Count down to any date & time', size: 'sm' },
  { type: 'clock', label: 'Clock', icon: '🕐', description: 'Live analog + digital clock', size: 'tall' },
  { type: 'calendar', label: 'Calendar', icon: '📅', description: 'Month view of your events', size: 'md' },
  { type: 'progress', label: 'Goal Progress', icon: '🎯', description: 'Track progress toward any goal', size: 'md' },
  { type: 'ninetyday', label: '90-Day Challenge', icon: '🏃', description: 'Day-by-day challenge tracker', size: 'md' },
  { type: 'checklist', label: 'Checklist', icon: '✅', description: 'Daily missions or to-dos', size: 'md' },
  { type: 'quote', label: 'Quote / Scripture', icon: '💬', description: 'Encouragement card', size: 'sm' },
  { type: 'savings', label: 'Savings Goal', icon: '💵', description: 'Track a financial goal', size: 'md' },
  { type: 'reading', label: 'Reading Goal', icon: '📖', description: 'Books completed this year', size: 'md' },
  { type: 'study', label: 'Study Goal', icon: '📚', description: 'Study hours or GPA tracker', size: 'md' },
  { type: 'text', label: 'Custom Text', icon: '📝', description: 'Freeform note card', size: 'sm' },
  { type: 'image', label: 'Image Card', icon: '🖼️', description: 'Upload a photo or logo', size: 'md' },
];

const emptyDraftFor = (item: LibraryItem): Partial<Widget> => ({
  type: item.type,
  title: item.label,
  icon: item.icon,
  size: item.size,
  accent: 'var(--accent)',
});

export default function AddWidgetModal({ onClose }: { onClose: () => void }) {
  const { addWidget } = useStore();
  const [selected, setSelected] = useState<LibraryItem | null>(null);
  const [draft, setDraft] = useState<Partial<Widget>>({});
  const [itemsText, setItemsText] = useState('First item, Second item, Third item');

  function pick(item: LibraryItem) {
    setSelected(item);
    setDraft(emptyDraftFor(item));
  }

  function submit() {
    if (!selected || !draft.title) return;
    const base: Omit<Widget, 'id' | 'order' | 'hidden'> = {
      type: selected.type,
      title: draft.title,
      subtitle: draft.subtitle,
      icon: draft.icon || selected.icon,
      accent: draft.accent,
      size: draft.size || selected.size,
      ctaLabel: draft.ctaLabel,
      targetDate: draft.targetDate,
      current: draft.current,
      target: draft.target,
      unit: draft.unit,
      extraLabel: draft.extraLabel,
      extraValue: draft.extraValue,
      extraSub: draft.extraSub,
      startDate: draft.startDate,
      totalDays: draft.totalDays,
      text: draft.text,
      author: draft.author,
      imageUrl: draft.imageUrl,
      items:
        selected.type === 'checklist'
          ? itemsText
              .split(',')
              .map((s) => s.trim())
              .filter(Boolean)
              .map((label) => ({ id: makeId(), label, done: false }))
          : undefined,
    };
    addWidget(base);
    onClose();
  }

  return (
    <Modal title={selected ? `Configure: ${selected.label}` : 'Add Widget'} onClose={onClose} width="max-w-xl">
      {!selected && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {LIBRARY.map((item) => (
            <button
              key={item.type}
              onClick={() => pick(item)}
              className="panel rounded-xl p-3 text-left hover:border-white/30 transition-colors"
              style={{ borderColor: 'rgba(255,255,255,0.1)' }}
            >
              <div className="text-xl mb-1.5">{item.icon}</div>
              <div className="text-[12.5px] font-semibold">{item.label}</div>
              <div className="text-[10.5px] text-white/40 leading-snug mt-0.5">{item.description}</div>
            </button>
          ))}
        </div>
      )}

      {selected && (
        <div className="flex flex-col gap-3">
          <Field label="Title">
            <input
              type="text"
              value={draft.title ?? ''}
              onChange={(e) => setDraft((d) => ({ ...d, title: e.target.value }))}
            />
          </Field>
          <Field label="Subtitle (optional)">
            <input
              type="text"
              value={draft.subtitle ?? ''}
              onChange={(e) => setDraft((d) => ({ ...d, subtitle: e.target.value }))}
            />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Icon (emoji)">
              <input type="text" value={draft.icon ?? ''} onChange={(e) => setDraft((d) => ({ ...d, icon: e.target.value }))} />
            </Field>
            <Field label="Accent Color">
              <input
                type="color"
                value={/^#/.test(draft.accent ?? '') ? draft.accent : '#22d3ee'}
                onChange={(e) => setDraft((d) => ({ ...d, accent: e.target.value }))}
              />
            </Field>
          </div>

          {selected.type === 'countdown' && (
            <>
              <Field label="Target Date & Time">
                <input
                  type="datetime-local"
                  onChange={(e) => setDraft((d) => ({ ...d, targetDate: e.target.value ? new Date(e.target.value).toISOString() : undefined }))}
                />
              </Field>
              <Field label="Call-to-action label (optional)">
                <input type="text" value={draft.ctaLabel ?? ''} onChange={(e) => setDraft((d) => ({ ...d, ctaLabel: e.target.value }))} />
              </Field>
            </>
          )}

          {(selected.type === 'progress' || selected.type === 'savings' || selected.type === 'reading' || selected.type === 'study') && (
            <div className="grid grid-cols-2 gap-3">
              <Field label="Current">
                <input type="number" value={draft.current ?? ''} onChange={(e) => setDraft((d) => ({ ...d, current: Number(e.target.value) }))} />
              </Field>
              <Field label="Target">
                <input type="number" value={draft.target ?? ''} onChange={(e) => setDraft((d) => ({ ...d, target: Number(e.target.value) }))} />
              </Field>
              <Field label="Unit label">
                <input
                  type="text"
                  placeholder={selected.type === 'savings' ? '$' : 'Books, hours, etc.'}
                  value={draft.unit ?? ''}
                  onChange={(e) => setDraft((d) => ({ ...d, unit: e.target.value }))}
                />
              </Field>
            </div>
          )}

          {selected.type === 'ninetyday' && (
            <div className="grid grid-cols-2 gap-3">
              <Field label="Start Date">
                <input type="date" onChange={(e) => setDraft((d) => ({ ...d, startDate: e.target.value }))} />
              </Field>
              <Field label="Total Days">
                <input
                  type="number"
                  value={draft.totalDays ?? 90}
                  onChange={(e) => setDraft((d) => ({ ...d, totalDays: Number(e.target.value) }))}
                />
              </Field>
            </div>
          )}

          {selected.type === 'checklist' && (
            <Field label="Items (comma separated)">
              <textarea rows={3} value={itemsText} onChange={(e) => setItemsText(e.target.value)} />
            </Field>
          )}

          {(selected.type === 'quote' || selected.type === 'text') && (
            <Field label={selected.type === 'quote' ? 'Quote text' : 'Body text'}>
              <textarea rows={3} value={draft.text ?? ''} onChange={(e) => setDraft((d) => ({ ...d, text: e.target.value }))} />
            </Field>
          )}
          {selected.type === 'quote' && (
            <Field label="Author (optional)">
              <input type="text" value={draft.author ?? ''} onChange={(e) => setDraft((d) => ({ ...d, author: e.target.value }))} />
            </Field>
          )}

          {selected.type === 'image' && (
            <Field label="Upload Image">
              <input
                type="file"
                accept="image/*"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  const imageUrl = await readFileAsDataURL(file);
                  setDraft((d) => ({ ...d, imageUrl }));
                }}
              />
            </Field>
          )}

          <div className="flex items-center justify-between pt-2">
            <button className="btn" onClick={() => setSelected(null)}>
              ← Back
            </button>
            <button className="btn-solid" onClick={submit} disabled={!draft.title}>
              + Add to Dashboard
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
}
