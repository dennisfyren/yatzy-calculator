import React, { useState } from "react";
import {
  entryText,
  scoreBoardInput,
  scoreBoardText,
  scoreBoardTextHeader,
} from "../lib/styles";
import { ArrowLeft } from "lucide-react";

function Game({ players, setActive }) {
  console.log(players);
  const bonusEntries = {
    1: null,
    2: null,
    3: null,
    4: null,
    5: null,
    6: null,
  };
  const entries = [
    "Par",
    "Två-Par",
    "Tre-Par",
    "Tretal",
    "Fyrtal",
    "Femtal",
    "Liten-Straight",
    "Stor-Straight",
    "Full-Straight",
    "Kåk",
    "Hus",
    "Torn",
    "Chans",
    "Yatzy",
  ];

  const [sum, setSum] = useState(0);
  const [value, setValue] = useState(null);

  function handleBonusChange(e) {
    console.log(e.target.value);
  }

  return (
    <div className="relative flex flex-col py-3 px-1">
      <ArrowLeft
        className="absolute left-2 top-2"
        size={32}
        onClick={() => {
          setActive("Dashboard");
        }}
      />
      <p className="text-2xl mb-4 self-center">Maxi Yatzy!</p>
      <div className="flex overflow-y-scroll">
        <div className="flex flex-col">
          <div>
            <div className="flex flex-col gap-1 mb-1">
              <p className={scoreBoardTextHeader}>Spelare:</p>
              {Object.keys(bonusEntries).map((number) => (
                <p className={scoreBoardText} key={number}>
                  {number} ( Antal )
                </p>
              ))}
            </div>
            <div className="flex flex-col gap-1">
              <p className={scoreBoardTextHeader}>Summa:</p>
              <p className={scoreBoardTextHeader}>Bonus:</p>
            </div>
            <div className="flex flex-col py-3 gap-1">
              {entries.map((entry) => (
                <div className="flex gap-1" key={entry}>
                  <p className={scoreBoardText}>{entry.replace("-", " ")}</p>
                </div>
              ))}
            </div>
            <p className={scoreBoardTextHeader}>Summa:</p>
          </div>
        </div>
        {Object.keys(players).map((player) => (
          <div key={player}>
            <div className="flex flex-col gap-1">
              <p className={entryText}>{player.slice(0, 1).toUpperCase()}</p>
              {Object.keys(bonusEntries).map((entry) => (
                <input
                  type="number"
                  className={scoreBoardInput}
                  key={`${entry}-${player}`}
                />
              ))}
              <p className={scoreBoardInput}>Summa</p>
              <p className={scoreBoardInput}>Bonus</p>
            </div>
            <div className="flex flex-col gap-1 mt-3">
              {entries.map((entry) => (
                <input
                  type="number"
                  key={`${entry}-${player}`}
                  className={scoreBoardInput}
                />
              ))}
            </div>
            <p className={`${scoreBoardInput} mt-3`}></p>
          </div>
        ))}
      </div>
      <button className="w-40 h-10 self-center mt-5 bg-slate-600 rounded">
        Räkna summa
      </button>
    </div>
  );
}

export default Game;
