import { ArrowLeft, X } from "lucide-react";
import React, { useState } from "react";
import { buttonStyle } from "../lib/styles";

function Stats({ setActive, users, removeUser, resetUser }) {
  const [currentPlayer, setCurrentPlayer] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  function handleClick(user) {
    setModalOpen(true);
    setCurrentPlayer(user);
  }

  function closeModal() {
    setModalOpen(false);
    setCurrentPlayer("");
  }

  function handleClear() {
    resetUser(currentPlayer);
  }

  function handleRemove() {
    removeUser(currentPlayer);
    setModalOpen(false);
  }

  function ShowStats() {
    const stats = users[currentPlayer] || {};
    return (
      <div className="relative flex flex-col items-center">
        <X className="absolute -top-10 -right-10" onClick={closeModal} />
        <p className="text-xl mb-2">
          {currentPlayer.slice(0, 1).toUpperCase() + currentPlayer.slice(1)}
        </p>
        <div className="flex flex-col items-center">
          <p>Antal spel: {stats.gamesPlayed}</p>
          <p>Vinster: {stats.wins}</p>
          <p>Förluster: {stats.losses}</p>
          <br />
          <p>Antal Yatzy: {stats.numYatzy}</p>
          <p>
            Högsta poäng:{" "}
            {stats.maxScore === -Infinity ? "Inga spel" : stats.maxScore}
          </p>
          <p>
            Minsta poäng:{" "}
            {stats.minScore === Infinity ? "Inga spel" : stats.minScore}
          </p>
          <p>Medelpoäng: {stats.avgScore}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col items-center gap-3 pt-16">
      {!modalOpen && (
        <ArrowLeft
          className="absolute left-1 top-2"
          size={32}
          onClick={() => setActive("Dashboard")}
        />
      )}
      <p className="text-3xl">Statistik</p>
      {Object.keys(users).map((user) => (
        <div className="relative flex items-center" key={user}>
          <button className={buttonStyle} onClick={() => handleClick(user)}>
            {user.slice(0, 1).toUpperCase() + user.slice(1)}
          </button>
        </div>
      ))}
      {modalOpen && (
        <div className="flex flex-col absolute top-0 left-0 h-screen w-screen bg-slate-900/85 items-center justify-center ">
          <ShowStats />

          <div className="flex gap-3">
            <button
              className={`bg-slate-600 h-10 px-3 mt-4 rounded`}
              onClick={handleClear}
            >
              Rensa statistik
            </button>
            <button
              className={`bg-red-600 h-10 px-3 mt-4 rounded`}
              onClick={handleRemove}
            >
              Ta bort spelare
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Stats;
