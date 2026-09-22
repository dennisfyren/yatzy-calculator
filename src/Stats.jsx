import { ArrowLeft } from "lucide-react";
import React, { useState } from "react";
import { buttonStyle } from "../lib/styles";

function Stats({ setActive, users }) {
  const [currentPlayer, setCurrentPlayer] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="relative flex flex-col items-center gap-3">
      <ArrowLeft
        className="absolute left-1 top-2"
        size={32}
        onClick={() => setActive("Dashboard")}
      />
      <p className="text-3xl">Statistik</p>
      {Object.keys(users).map((user) => (
        <button className={buttonStyle} onClick={() => setCurrentPlayer(user)}>
          {user.slice(0, 1).toUpperCase() + user.slice(1)}
        </button>
      ))}
    </div>
  );
}

export default Stats;
