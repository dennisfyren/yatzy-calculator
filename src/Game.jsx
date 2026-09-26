import React, { useEffect, useState } from "react";
import {
  entryText,
  scoreBoardInput,
  scoreBoardText,
  scoreBoardTextHeader,
} from "../lib/styles";
import { ArrowLeft, Eraser } from "lucide-react";
import useLocalStorage from "../hooks/useLocalStorage";

function Game({ players, setActive, updateUsers }) {
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

  const [scores, setScores] = useLocalStorage("scores", {});
  const [showSum, setShowSum] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [winner, setWinner] = useState("");

  function handleBonusEntry(player, entry, value) {
    const clamped = Math.min(6, Math.max(0, value));

    setScores((prev) => ({
      ...prev,
      [player]: {
        ...prev[player],
        bonus: {
          ...prev[player]?.bonus,
          [entry]: Number(clamped) * Number(entry),
        },
        number: { ...prev[player]?.number, [entry]: Number(clamped) },
      },
    }));
  }

  function handleEntry(player, entry, value) {
    setScores((prev) => ({
      ...prev,
      [player]: {
        ...prev[player],
        entries: {
          ...prev[player]?.entries,
          [entry]: Number(value),
        },
      },
    }));
  }

  function calcBonusSum(player) {
    const bonus = scores[player]?.bonus || {};
    return Object.values(bonus).reduce((total, val) => total + Number(val), 0);
  }

  function calcBonusBonus(player) {
    return calcBonusSum(player) >= 84 ? 100 : 0;
  }

  function calcSum(player) {
    const bonusEntriesSum = calcBonusSum(player);
    const bonus = calcBonusBonus(player);
    const entriesSum = Object.values(scores[player]?.entries || {}).reduce(
      (total, val) => total + (val || 0),
      0,
    );
    return bonusEntriesSum + bonus + entriesSum;
  }

  function getWinningScore() {
    const playerScores = {};

    Object.keys(players).forEach((rawPlayer) => {
      const player = rawPlayer.toLowerCase();
      playerScores[player] = calcSum(player);
    });

    const [, winningScore] = Object.entries(playerScores).sort(
      (a, b) => b[1] - a[1],
    )[0];
    return winningScore;
  }

  function showScore() {
    setShowSum(true);
    setClicked(true);
  }

  function allEntriesFilled() {
    const n = entries.length + Object.keys(bonusEntries).length;
    if (Object.entries(scores).length === 0) return false;
    const filled = Object.values(scores).every(
      (score) =>
        Object.values(score.bonus || {}).length +
          Object.values(score.entries || {}).length ===
        n,
    );
    return filled;
  }

  function endGame() {
    if (Object.keys(scores).length === 0) return;
    const gameData = { players: {} };
    const playerScores = {};
    Object.keys(players).forEach((rawPlayer) => {
      const player = rawPlayer.toLowerCase();
      playerScores[player] = calcSum(player);
    });

    const topScore = getWinningScore();

    // const [, topScore] = Object.entries(playerScores).sort(
    //   (a, b) => b[1] - a[1],
    // )[0];
    Object.entries(playerScores).forEach(([player, score]) => {
      gameData.players[player] = {
        score: score,
        win: score === topScore,
        yatzy:
          scores[player]?.entries?.Yatzy !== undefined &&
          scores[player]?.entries?.Yatzy > 0,
      };
    });
    updateUsers(gameData);
    localStorage.removeItem("scores");
    setActive("Dashboard");
  }

  return (
    <div className="relative flex flex-col py-3 px-1">
      {!confirm && (
        <ArrowLeft
          className="absolute left-2 top-2"
          size={32}
          onClick={() => {
            setActive("Dashboard");
          }}
        />
      )}
      {!confirm && (
        <Eraser
          className="absolute top-2 right-2"
          size={32}
          onClick={() => setConfirm(true)}
        />
      )}
      {confirm && (
        <div className="absolute top-0 left-0 h-screen w-screen flex flex-col items-center justify-center bg-slate-900/90">
          <p>Är du säker att du vill rensa resultaten?</p>
          <div className="flex gap-4 pt-3">
            <button
              className="h-10 w-24 rounded bg-red-500"
              onClick={() => {
                setScores({});
                setConfirm(false);
                setClicked(false);
                setShowSum(false);
              }}
            >
              Ja
            </button>
            <button
              className="h-10 w-24 rounded bg-slate-500"
              onClick={() => setConfirm(false)}
            >
              Nej
            </button>
          </div>
        </div>
      )}

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
        {Object.keys(players).map((rawPlayer) => {
          const player = rawPlayer.toLowerCase();
          return (
            <div key={player}>
              <div className="flex flex-col gap-1">
                <p className={entryText}>{player.slice(0, 1).toUpperCase()}</p>
                {Object.keys(bonusEntries).map((entry) => (
                  <input
                    type="number"
                    className={scoreBoardInput}
                    key={`${entry}-${player}`}
                    onFocus={(e) => e.target.select()}
                    value={scores[player]?.number?.[entry] ?? ""}
                    onChange={(e) =>
                      handleBonusEntry(
                        player.toLowerCase(),
                        entry,
                        e.target.value,
                      )
                    }
                  />
                ))}

                <p className={`${scoreBoardInput} pt-0.5`}>
                  {calcBonusSum(player)}
                </p>
                <p className={`${scoreBoardInput} pt-0.5`}>
                  {calcBonusBonus(player)}
                </p>
              </div>
              <div className="flex flex-col gap-1 mt-3">
                {entries.map((entry) => (
                  <input
                    type="number"
                    key={`${entry}-${player}`}
                    className={scoreBoardInput}
                    onFocus={(e) => e.target.select()}
                    value={scores[player]?.entries?.[entry] ?? ""}
                    onChange={(e) => handleEntry(player, entry, e.target.value)}
                  />
                ))}
              </div>
              <p
                className={`${scoreBoardInput} ${calcSum(player) === getWinningScore() ? "text-green-600 font-semibold" : ""} mt-3 pt-0.5`}
              >
                {showSum && calcSum(player)}
              </p>
            </div>
          );
        })}
      </div>
      <button
        className={`w-40 h-10 self-center mt-5 bg-slate-600 rounded disabled:opacity-65`}
        onClick={clicked ? endGame : showScore}
        disabled={!allEntriesFilled()}
      >
        {clicked ? "Avsluta Spel" : "Räkna summa"}
      </button>
    </div>
  );
}

export default Game;
