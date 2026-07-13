# T-Minus Dashboard

Mission Control for the life you're building. A drag-and-drop personal dashboard
(countdowns, habits, goals, journal, calendar, achievements) with two starter
templates ("Adult Mission Control" and "Student Starpath").

## Develop

```
npm install
npm run dev
```

## Build

```
npm run build
```

This produces a single self-contained `dist/index.html` — one file, no
separate JS/CSS assets to host. Copy its contents into a WordPress "Custom
HTML" block (or any static page/embed) to deploy.

## Editing widgets, dates, colors, and themes

- **Edit any widget**: hover a widget on the dashboard (or turn on "✏️ Design
  Widgets") and click the ✎ pencil icon. This opens the same form used to add
  widgets, pre-filled with its current title, dates, progress numbers,
  checklist items, and color — change anything and click **Save Changes**.
  The same ✎ button is available on the Missions and Goals pages.
- **Today's Missions / any checklist**: open its ✎ edit form to rename,
  reorder, add, or remove individual items — not just toggle them done.
- **Widget color**: set per-widget in that same edit form ("Accent color").
- **Themes**: click **🎨 Themes** on the dashboard (or Settings → Colors &
  Theme) to switch between the two built-in color themes, or save your
  current colors as a brand-new named theme you can reapply any time. This
  is separate from "Switch Template" (Settings → Switch Template), which
  swaps the entire sidebar/starter-widget set and is a bigger, confirmed
  change.
- All data is saved automatically to the browser's localStorage. Use
  Settings → Data to export/import a JSON backup.
