import { create } from "zustand";
import { persist } from "zustand/middleware";
import { defaultsFor } from "./data.js";
import { uid, sizeToWH } from "./utils.js";
import { placeWidget } from "./layout.js";

function ensureWidgetLayout(w, existingLayouts) {
  if (w.layout && w.layout.w > 0 && w.layout.h > 0) return w;
  const { w: dw, h: dh } = sizeToWH(w.size);
  const pos = placeWidget(existingLayouts, dw);
  return { ...w, layout: { x: pos.x, y: pos.y, w: dw, h: dh } };
}

export const useStore = create(
  persist(
    (set, get) => ({
      ...defaultsFor("adult"),
      customThemes: [],
      activePage: "dashboard",
      designMode: false,

      setActivePage: (page) => set({ activePage: page }),
      toggleDesignMode: () => set((s) => ({ designMode: !s.designMode })),

      applyTemplate: (template) => {
        set({ ...defaultsFor(template), activePage: "dashboard", designMode: false });
      },

      updateTheme: (patch) => set((s) => ({ theme: { ...s.theme, ...patch } })),
      updateText: (patch) => set((s) => ({ text: { ...s.text, ...patch } })),
      updateProfile: (patch) => set((s) => ({ profile: { ...s.profile, ...patch } })),

      // ---- custom themes ----
      saveCustomTheme: (name, emoji) =>
        set((s) => ({
          customThemes: [
            ...s.customThemes,
            { id: uid(), name: name || "Untitled Theme", emoji: emoji || "🎨", colors: { ...s.theme } },
          ],
        })),
      applyCustomTheme: (id) =>
        set((s) => {
          const t = s.customThemes.find((t) => t.id === id);
          if (!t) return {};
          return { theme: { ...t.colors } };
        }),
      renameCustomTheme: (id, name) =>
        set((s) => ({
          customThemes: s.customThemes.map((t) => (t.id === id ? { ...t, name } : t)),
        })),
      deleteCustomTheme: (id) =>
        set((s) => ({ customThemes: s.customThemes.filter((t) => t.id !== id) })),

      // ---- widgets ----
      addWidget: (w) =>
        set((s) => {
          const layouts = s.widgets.filter((w) => !w.hidden).map((w) => w.layout);
          const order = s.widgets.length ? Math.max(...s.widgets.map((w) => w.order)) + 1 : 0;
          const newWidget = ensureWidgetLayout(
            { ...w, id: uid(), order, hidden: false, layout: w.layout || { x: 0, y: 0, w: 0, h: 0 } },
            layouts
          );
          return { widgets: [...s.widgets, newWidget] };
        }),
      updateWidget: (id, patch) =>
        set((s) => ({
          widgets: s.widgets.map((w) => (w.id === id ? { ...w, ...patch } : w)),
        })),
      removeWidget: (id) => set((s) => ({ widgets: s.widgets.filter((w) => w.id !== id) })),
      hideWidget: (id) =>
        set((s) => ({ widgets: s.widgets.map((w) => (w.id === id ? { ...w, hidden: true } : w)) })),
      showWidget: (id) =>
        set((s) => ({ widgets: s.widgets.map((w) => (w.id === id ? { ...w, hidden: false } : w)) })),
      updateWidgetLayout: (id, layout) =>
        set((s) => ({ widgets: s.widgets.map((w) => (w.id === id ? { ...w, layout } : w)) })),
      bulkUpdateLayout: (updates) =>
        set((s) => {
          const byId = new Map(updates.map((u) => [u.id, u.layout]));
          return {
            widgets: s.widgets.map((w) => (byId.has(w.id) ? { ...w, layout: byId.get(w.id) } : w)),
          };
        }),
      resetLayout: () => {
        const template = get().template;
        set({ widgets: defaultsFor(template).widgets });
      },

      toggleChecklistItem: (widgetId, itemId) =>
        set((s) => ({
          widgets: s.widgets.map((w) =>
            w.id === widgetId && w.items
              ? { ...w, items: w.items.map((i) => (i.id === itemId ? { ...i, done: !i.done } : i)) }
              : w
          ),
        })),
      setChecklistItems: (widgetId, items) =>
        set((s) => ({
          widgets: s.widgets.map((w) => (w.id === widgetId ? { ...w, items } : w)),
        })),

      // ---- events / habits / journal / lists ----
      addEvent: (e) => set((s) => ({ events: [...s.events, { ...e, id: uid() }] })),
      updateEvent: (id, patch) =>
        set((s) => ({ events: s.events.map((e) => (e.id === id ? { ...e, ...patch } : e)) })),
      removeEvent: (id) => set((s) => ({ events: s.events.filter((e) => e.id !== id) })),

      addHabit: (h) =>
        set((s) => ({ habits: [...s.habits, { ...h, id: uid(), streak: 0, completedToday: false }] })),
      toggleHabitToday: (id) =>
        set((s) => ({
          habits: s.habits.map((h) =>
            h.id === id
              ? {
                  ...h,
                  completedToday: !h.completedToday,
                  streak: h.completedToday ? Math.max(0, h.streak - 1) : h.streak + 1,
                }
              : h
          ),
        })),
      removeHabit: (id) => set((s) => ({ habits: s.habits.filter((h) => h.id !== id) })),

      addJournalEntry: (e) => set((s) => ({ journal: [{ ...e, id: uid() }, ...s.journal] })),
      updateJournalEntry: (id, patch) =>
        set((s) => ({ journal: s.journal.map((j) => (j.id === id ? { ...j, ...patch } : j)) })),
      removeJournalEntry: (id) => set((s) => ({ journal: s.journal.filter((j) => j.id !== id) })),

      addListItem: (key, item) => set((s) => ({ [key]: [...s[key], { ...item, id: uid() }] })),
      removeListItem: (key, id) => set((s) => ({ [key]: s[key].filter((i) => i.id !== id) })),

      toggleMessageRead: (id) =>
        set((s) => ({
          messages: s.messages.map((m) => (m.id === id ? { ...m, unread: !m.unread } : m)),
        })),

      updateVitals: (patch) => set((s) => ({ vitals: { ...s.vitals, ...patch } })),
    }),
    {
      name: "t-minus-dashboard-storage-v2",
      version: 2,
    }
  )
);
