import { useEffect, useState } from 'react';
import { useStore } from './store/useStore';
import { NowProvider } from './hooks/useNow';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import AddWidgetModal from './components/AddWidgetModal';
import ThemesModal from './components/ThemesModal';

import Dashboard from './pages/Dashboard';
import Missions from './pages/Missions';
import CalendarPage from './pages/CalendarPage';
import Goals from './pages/Goals';
import Habits from './pages/Habits';
import Journal from './pages/Journal';
import Achievements from './pages/Achievements';
import Stats from './pages/Stats';
import Settings from './pages/Settings';
import ListPage from './pages/ListPage';
import Messages from './pages/Messages';

function PageSwitch() {
  const { activePage, template } = useStore();
  switch (activePage) {
    case 'dashboard':
      return <Dashboard />;
    case 'missions':
    case 'school':
      return <Missions />;
    case 'calendar':
      return <CalendarPage />;
    case 'goals':
    case 'finances':
      return <Goals />;
    case 'habits':
      return <Habits />;
    case 'journal':
      return <Journal />;
    case 'achievements':
      return <Achievements />;
    case 'stats':
      return <Stats />;
    case 'resources':
      return <ListPage kind="resources" />;
    case 'friends':
      return template === 'student' ? <ListPage kind="friends" /> : <Dashboard />;
    case 'messages':
      return <Messages />;
    case 'settings':
      return <Settings />;
    default:
      return <Dashboard />;
  }
}

export default function App() {
  const theme = useStore((s) => s.theme);
  const title = useStore((s) => s.text.title);
  const [addWidgetOpen, setAddWidgetOpen] = useState(false);
  const [themesOpen, setThemesOpen] = useState(false);

  useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <div
      className="h-screen w-screen flex relative"
      style={
        {
          '--accent': theme.accent,
          '--accent-2': theme.accent2,
          '--accent-3': theme.accent3,
          '--bg-from': theme.bgFrom,
          '--bg-to': theme.bgTo,
        } as React.CSSProperties
      }
    >
      <div className="starfield" />
      <NowProvider>
        <Sidebar />
        <main className="flex-1 h-full overflow-y-auto relative z-10 px-6 py-5 flex flex-col gap-4">
          <TopBar onAddWidget={() => setAddWidgetOpen(true)} onThemes={() => setThemesOpen(true)} />
          <PageSwitch />
        </main>
        {addWidgetOpen && <AddWidgetModal onClose={() => setAddWidgetOpen(false)} />}
        {themesOpen && <ThemesModal onClose={() => setThemesOpen(false)} />}
      </NowProvider>
    </div>
  );
}
