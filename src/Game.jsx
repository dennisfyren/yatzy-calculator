import React, { useState } from "react";
import { scoreBoardInput, scoreBoardText } from "../lib/styles";

function Game({ players }) {
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

  const playerNumber = 2;

  return (
    <div className="flex flex-col py-3">
      <p className="text-2xl mb-4 self-center">Maxi Yatzy!</p>
      <div className="flex">
        <div className="flex flex-col">
          <div>
            <div className="flex flex-col gap-1 mb-1">
              {Object.keys(bonusEntries).map((number) => (
                <p className={scoreBoardText}>{number}</p>
              ))}
            </div>
            <div className="flex flex-col gap-1">
              <p className={scoreBoardText}>Summa:</p>
              <p className={scoreBoardText}>Bonus:</p>
            </div>
            <div className="flex flex-col py-3 gap-1">
              {entries.map((entry) => (
                <div className="flex gap-1" key={entry}>
                  <p className={scoreBoardText}>{entry.replace("-", " ")}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
}

export default Game;
