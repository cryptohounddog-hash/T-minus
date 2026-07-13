import React, { useEffect } from "react";
import { useStore } from "./store.js";
import { NowProvider } from "./NowContext.jsx";
import Sidebar from "./components/Sidebar.jsx";
import Header from "./components/Header.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Missions from "./pages/Missions.jsx";
import CalendarPage from "./pages/CalendarPage.jsx";
import Goals from "./pages/Goals.jsx";
import Habits from "./pages/Habits.jsx";
import Journal from "./pages/Journal.jsx";
import Achievements from "./pages/Achievements.jsx";
import Stats from "./pages/Stats.jsx";
import ListPage from "./pages/ListPage.jsx";
import Messages from "./pages/Messages.jsx";
import Settings from "./pages/Settings.jsx";

function PageRouter() {
  const activePage = useStore((s) => s.activePage);
  const template = useStore((s) => s.template);

  switch (activePage) {
    case "dashboard":
      return <Dashboard />;
    case "missions":
    case "school":
      return <Missions />;
    case "calendar":
      return <CalendarPage />;
    case "goals":
    case "finances":
      return <Goals />;
    case "habits":
      return <Habits />;
    case "journal":
      return <Journal />;
    case "achievements":
      return <Achievements />;
    case "stats":
      return <Stats />;
    case "resources":
      return <ListPage storeKey="resources" />;
    case "friends":
      return template === "student" ? <ListPage storeKey="friends" /> : <Dashboard />;
    case "messages":
      return <Messages />;
    case "settings":
      return <Settings />;
    default:
      return <Dashboard />;
  }
}

export default function App() {
  const theme = useStore((s) => s.theme);
  const title = useStore((s) => s.text.title);

  useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <div
      className="app-root"
      style={{
        "--accent": theme.accent,
        "--accent-2": theme.accent2,
        "--accent-3": theme.accent3,
        "--bg-from": theme.bgFrom,
        "--bg-to": theme.bgTo,
      }}
    >
      <div className="starfield" />
      <div className="app-body">
        <NowProvider>
          <Sidebar />
          <main className="main">
            <Header />
            <PageRouter />
          </main>
        </NowProvider>
      </div>
    </div>
  );
}
