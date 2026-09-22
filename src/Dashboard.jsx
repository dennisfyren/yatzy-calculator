import React, { useEffect, useState } from "react";
import { buttonStyle, scoreBoardInput, scoreBoardText } from "../lib/styles";
import useUsers from "../hooks/useUsers";
import { X } from "lucide-react";

function Dashboard({
  setActive,
  players,
  setPlayers,
  users,
  addUsers,
  updateUsers,
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState("");
  const [value, setValue] = useState("");

  function handleClick() {
    setModalOpen((modalOpen) => !modalOpen);
  }
  function handleChange(v) {
    setSelected(v);
    if (v === "new" || v === "") return;
    setPlayers((prev) => ({ ...prev, [v]: {} }));
    setSelected("");
  }

  function playGame() {
    setActive("Game");
  }

  function addPlayer() {
    const newPlayer = value.trim().toLowerCase();
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

  useEffect(() => {
    console.log(players);
  }, [players]);

  return (
    <>
      {modalOpen && (
        <div className="absolute h-full w-full bg-slate-900/90 ">
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
                <div className="flex items-center">
                  <p key={name}>
                    {name.slice(0, 1).toUpperCase() + name.slice(1)}
                  </p>
                  <X
                    size={20}
                    className="text-red-500 ml-2"
                    onClick={() => removePlayer(name)}
                  />
                </div>
              ))}
            </div>
            <select
              className="bg-slate-900 rounded"
              value={selected}
              onChange={(v) => handleChange(v.target.value)}
            >
              <option className="" value={""}>
                Select Players
              </option>
              {/* {users.map((p) => (
                <option key={p}>{p}</option>
              ))} */}
              {Object.keys(users).map((user) => (
                <option key={user}>
                  {user.slice(0, 1).toUpperCase() + user.slice(1)}
                </option>
              ))}
              <option value={"new"}>New player</option>
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
                  Add
                </button>
              </div>
            )}
            <button className={`${buttonStyle} mt-12`} onClick={playGame}>
              Play!
            </button>
          </div>
        </div>
      )}

      <div className="h-full flex flex-col items-center p-6 gap-3 justify-center">
        <p className="text-4xl mb-2">Maxi Yatzy!</p>
        <button className={buttonStyle} onClick={handleClick}>
          New game
        </button>
        {/* <button className={buttonStyle}>Load Game</button> */}
      </div>
    </>
  );
}

export default Dashboard;
