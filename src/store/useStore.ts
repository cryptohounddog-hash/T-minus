import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  AppState,
  Widget,
  WidgetSize,
  TemplateId,
  ThemeConfig,
  TextConfig,
  ProfileConfig,
  CalendarEvent,
  Habit,
  JournalEntry,
  ListLink,
  Vitals,
  PageId,
} from '../types';
import { createPreset } from '../data/templates';
import { makeId } from '../utils/id';

const SIZE_ORDER: WidgetSize[] = ['sm', 'md', 'wide', 'lg'];

interface StoreState extends AppState {
  activePage: PageId;
  designMode: boolean;
  setActivePage: (page: PageId) => void;
  toggleDesignMode: () => void;

  applyTemplate: (id: TemplateId) => void;
  updateTheme: (patch: Partial<ThemeConfig>) => void;
  updateText: (patch: Partial<TextConfig>) => void;
  updateProfile: (patch: Partial<ProfileConfig>) => void;

  addWidget: (widget: Omit<Widget, 'id' | 'order' | 'hidden'>) => void;
  updateWidget: (id: string, patch: Partial<Widget>) => void;
  removeWidget: (id: string) => void;
  hideWidget: (id: string) => void;
  showWidget: (id: string) => void;
  moveWidget: (id: string, dir: 'left' | 'right') => void;
  cycleWidgetSize: (id: string) => void;
  resetLayout: () => void;
  toggleChecklistItem: (widgetId: string, itemId: string) => void;

  addEvent: (event: Omit<CalendarEvent, 'id'>) => void;
  updateEvent: (id: string, patch: Partial<CalendarEvent>) => void;
  removeEvent: (id: string) => void;

  addHabit: (habit: Omit<Habit, 'id' | 'streak' | 'completedToday' | 'history'>) => void;
  toggleHabitToday: (id: string) => void;
  removeHabit: (id: string) => void;

  addJournalEntry: (entry: Omit<JournalEntry, 'id'>) => void;
  updateJournalEntry: (id: string, patch: Partial<JournalEntry>) => void;
  removeJournalEntry: (id: string) => void;

  addListItem: (list: 'resources' | 'friends', item: Omit<ListLink, 'id'>) => void;
  removeListItem: (list: 'resources' | 'friends', id: string) => void;

  toggleMessageRead: (id: string) => void;

  updateVitals: (patch: Partial<Vitals>) => void;
}

function nextOrder(widgets: Widget[]): number {
  return widgets.length ? Math.max(...widgets.map((w) => w.order)) + 1 : 0;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      ...createPreset('adult'),
      activePage: 'dashboard',
      designMode: false,

      setActivePage: (page) => set({ activePage: page }),
      toggleDesignMode: () => set((s) => ({ designMode: !s.designMode })),

      applyTemplate: (id) => {
        const preset = createPreset(id);
        set({ ...preset, activePage: 'dashboard', designMode: false });
      },

      updateTheme: (patch) => set((s) => ({ theme: { ...s.theme, ...patch } })),
      updateText: (patch) => set((s) => ({ text: { ...s.text, ...patch } })),
      updateProfile: (patch) => set((s) => ({ profile: { ...s.profile, ...patch } })),

      addWidget: (widget) =>
        set((s) => ({
          widgets: [...s.widgets, { ...widget, id: makeId(), order: nextOrder(s.widgets), hidden: false }],
        })),
      updateWidget: (id, patch) =>
        set((s) => ({ widgets: s.widgets.map((w) => (w.id === id ? { ...w, ...patch } : w)) })),
      removeWidget: (id) => set((s) => ({ widgets: s.widgets.filter((w) => w.id !== id) })),
      hideWidget: (id) =>
        set((s) => ({ widgets: s.widgets.map((w) => (w.id === id ? { ...w, hidden: true } : w)) })),
      showWidget: (id) =>
        set((s) => ({ widgets: s.widgets.map((w) => (w.id === id ? { ...w, hidden: false } : w)) })),
      moveWidget: (id, dir) =>
        set((s) => {
          const visible = [...s.widgets].filter((w) => !w.hidden).sort((a, b) => a.order - b.order);
          const idx = visible.findIndex((w) => w.id === id);
          if (idx === -1) return s;
          const swapIdx = dir === 'left' ? idx - 1 : idx + 1;
          if (swapIdx < 0 || swapIdx >= visible.length) return s;
          const a = visible[idx];
          const b = visible[swapIdx];
          const orderA = a.order;
          const orderB = b.order;
          return {
            widgets: s.widgets.map((w) => {
              if (w.id === a.id) return { ...w, order: orderB };
              if (w.id === b.id) return { ...w, order: orderA };
              return w;
            }),
          };
        }),
      cycleWidgetSize: (id) =>
        set((s) => ({
          widgets: s.widgets.map((w) => {
            if (w.id !== id) return w;
            const i = SIZE_ORDER.indexOf(w.size === 'tall' ? 'lg' : w.size);
            const next = SIZE_ORDER[(i + 1) % SIZE_ORDER.length];
            return { ...w, size: next };
          }),
        })),
      resetLayout: () => {
        const id = get().template;
        const preset = createPreset(id);
        set({ widgets: preset.widgets });
      },
      toggleChecklistItem: (widgetId, itemId) =>
        set((s) => ({
          widgets: s.widgets.map((w) =>
            w.id === widgetId && w.items
              ? { ...w, items: w.items.map((it) => (it.id === itemId ? { ...it, done: !it.done } : it)) }
              : w
          ),
        })),

      addEvent: (event) => set((s) => ({ events: [...s.events, { ...event, id: makeId() }] })),
      updateEvent: (id, patch) =>
        set((s) => ({ events: s.events.map((e) => (e.id === id ? { ...e, ...patch } : e)) })),
      removeEvent: (id) => set((s) => ({ events: s.events.filter((e) => e.id !== id) })),

      addHabit: (habit) =>
        set((s) => ({
          habits: [...s.habits, { ...habit, id: makeId(), streak: 0, completedToday: false, history: [] }],
        })),
      toggleHabitToday: (id) =>
        set((s) => ({
          habits: s.habits.map((h) =>
            h.id === id
              ? {
                  ...h,
                  completedToday: !h.completedToday,
                  streak: !h.completedToday ? h.streak + 1 : Math.max(0, h.streak - 1),
                }
              : h
          ),
        })),
      removeHabit: (id) => set((s) => ({ habits: s.habits.filter((h) => h.id !== id) })),

      addJournalEntry: (entry) =>
        set((s) => ({ journal: [{ ...entry, id: makeId() }, ...s.journal] })),
      updateJournalEntry: (id, patch) =>
        set((s) => ({ journal: s.journal.map((j) => (j.id === id ? { ...j, ...patch } : j)) })),
      removeJournalEntry: (id) => set((s) => ({ journal: s.journal.filter((j) => j.id !== id) })),

      addListItem: (list, item) =>
        set((s) => ({ [list]: [...s[list], { ...item, id: makeId() }] } as Partial<StoreState>)),
      removeListItem: (list, id) =>
        set((s) => ({ [list]: s[list].filter((i) => i.id !== id) } as Partial<StoreState>)),

      toggleMessageRead: (id) =>
        set((s) => ({ messages: s.messages.map((m) => (m.id === id ? { ...m, unread: !m.unread } : m)) })),

      updateVitals: (patch) => set((s) => ({ vitals: { ...s.vitals, ...patch } })),
    }),
    {
      name: 't-minus-dashboard-storage',
      version: 1,
    }
  )
);
