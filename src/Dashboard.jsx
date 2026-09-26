import React, { useState } from "react";
import { buttonStyle } from "../lib/styles";
import { X } from "lucide-react";

function Dashboard({ setActive, players, setPlayers, users, addUser }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState("");
  const [value, setValue] = useState("");

  function handleClick() {
    setModalOpen((modalOpen) => !modalOpen);
  }
  function handleChange(val) {
    setSelected(val);
    if (val === "new" || val === "") return;
    setPlayers((prev) => ({ ...prev, [val]: {} }));
    setSelected("");
  }

  function playGame() {
    if (Object.keys(players).length === 0) return;
    setActive("Game");
  }

  function addPlayer() {
    const newPlayer = value.trim().toLowerCase();
    if (newPlayer === "" || players[newPlayer] || users[newPlayer]) return;
    addUser(newPlayer);
    setSelected("");
    setValue("");
    setPlayers((prev) => ({ ...prev, [newPlayer]: {} }));
  }

  function removePlayer(player) {
    setPlayers((prev) => {
      const updated = { ...prev };
      delete updated[player];
      return updated;
    });
  }

  return (
    <>
      {modalOpen && (
        <div className="absolute h-full w-full bg-slate-900/95 ">
          <div className="flex flex-col items-center h-full justify-center">
            <button
              className="absolute top-1 right-3 text-3xl"
              onClick={() => {
                handleClick();
                setValue("");
                setSelected("");
                setPlayers({});
              }}
            >
              ✕
            </button>
            <div className="flex flex-col items-center gap-1 mb-6 tracking-wide">
              {Object.keys(players).map((name) => (
                <div key={name} className="flex items-center">
                  <p>{name.slice(0, 1).toUpperCase() + name.slice(1)}</p>
                  <button>
                    <X
                      size={20}
                      className="text-red-500 ml-2"
                      onClick={() => removePlayer(name)}
                    />
                  </button>
                </div>
              ))}
            </div>
            <select
              className="bg-slate-900 rounded"
              value={selected}
              onChange={(v) => handleChange(v.target.value)}
            >
              <option value={""}>Välj spelare</option>
              {Object.keys(users).map((user) => (
                <option key={user} value={user}>
                  {user.slice(0, 1).toUpperCase() + user.slice(1)}
                </option>
              ))}
              <option value={"new"}>Ny spelare</option>
            </select>
            {selected === "new" && (
              <div className="mt-5">
                <input
                  className="bg-slate-50 rounded-l text-black text-center w-40"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      addPlayer();
                    }
                  }}
                />
                <button
                  className="bg-slate-500 px-3 rounded-r"
                  onClick={addPlayer}
                >
                  Lägg till
                </button>
              </div>
            )}
            <button
              className={`${buttonStyle} mt-12`}
              onClick={playGame}
              disabled={Object.keys(players).length === 0}
            >
              Spela!
            </button>
          </div>
        </div>
      )}

      <div className="h-full flex flex-col items-center p-6 gap-3 justify-center">
        <p className="text-4xl mb-2">Maxi Yatzy!</p>
        <button className={`${buttonStyle}`} onClick={handleClick}>
          Nytt spel
        </button>
        {/* <button className={buttonStyle}>Load Game</button> */}
      </div>
    </>
  );
}

export default Dashboard;
