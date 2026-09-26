import { useEffect, useState } from "react";
import Dashboard from "./Dashboard";
import Game from "./Game";
import Stats from "./Stats";
import { buttonStyle } from "../lib/styles";
import useUsers from "../hooks/useUsers";

const views = {
  Game,
  Dashboard,
  Stats,
};

function App() {
  const [active, setActive] = useState("Dashboard");
  const CurrentView = views[active];
  const [players, setPlayers] = useState({});
  const [users, addUser, updateUsers, removeUser, resetUser] = useUsers();

  return (
    <div className="grid h-screen grid-cols-1 grid-rows-[1fr_auto] bg-slate-900 text-white">
      <main className="min-h-0 overflow-auto">
        <CurrentView
          setActive={setActive}
          players={players}
          setPlayers={setPlayers}
          users={users}
          addUser={addUser}
          updateUsers={updateUsers}
          removeUser={removeUser}
          resetUser={resetUser}
        />
      </main>
      {active === "Dashboard" && (
        <button
          className={`${buttonStyle} w-full`}
          onClick={() => setActive("Stats")}
        >
          Statistik
        </button>
      )}
    </div>
  );
}

export default App;
