import React, { useEffect, useState } from "react";
import { buttonStyle, scoreBoardInput, scoreBoardText } from "../lib/styles";

function Dashboard({ setActive }) {
  const [modalOpen, setModalOpen] = useState(false);

  function handleClick() {
    setModalOpen((modalOpen) => !modalOpen);
  }
  function handleChange(v) {
    setSelected(v);
    if (v === "new" || v === "") return;
    setPlayers((prev) => ({ ...prev, [v]: {} }));
    setSelected("");
  }

  function addPlayer() {}

  // Temporary players before localstorage
  const player = ["Dennis", "Thatsaniya"];

  const [selected, setSelected] = useState("");
  const [players, setPlayers] = useState({});
  const [value, setValue] = useState("");

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
                <p key={name}>{name}</p>
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
              {player.map((p) => (
                <option key={p}>{p}</option>
              ))}
              <option value={"new"}>New player</option>
            </select>
            {selected === "new" && (
              <div>
                <input
                  className="bg-slate-50 rounded-l mt-2 text-black text-center w-40"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                />
                <button
                  className="bg-green-400 text-black px-3 mt-1 rounded-r"
                  onClick={addPlayer}
                >
                  Add
                </button>
              </div>
            )}
            <button className={`${buttonStyle} mt-12`}>Play!</button>
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
