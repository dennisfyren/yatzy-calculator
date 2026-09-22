import { useEffect, useState } from "react";
import Dashboard from "./Dashboard";
import Game from "./Game";
import Stats from "./Stats";

const views = {
  Game,
  Dashboard,
  Stats,
};

const nav = Object.keys(views);

function App() {
  const [active, setActive] = useState("Dashboard");
  const CurrentView = views[active];
  const [players, setPlayers] = useState({});

  return (
    <div className="grid h-screen grid-cols-1 grid-rows-[1fr_auto] bg-slate-900 text-white">
      <main className="min-h-0 overflow-auto">
        <CurrentView
          setActive={setActive}
          players={players}
          setPlayers={setPlayers}
        />
      </main>
      {/* <nav className="grid grid-cols-3 bg-slate-800 items-center">
        {nav.map((view) => (
          <button className="h-16" key={view} onClick={() => setActive(item)}>
            {view}
          </button>
        ))}
      </nav> */}
    </div>
  );
}

export default App;
