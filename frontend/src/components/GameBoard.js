import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

const GameBoard = ({ game, playerId }) => {
  const [currentGame, setCurrentGame] = useState(game);

  useEffect(() => {
    // Join the game room for live updates
    socket.emit("joinGame", currentGame._id);

    socket.on("gameUpdate", (updatedGame) => {
      setCurrentGame(updatedGame);
    });

    return () => socket.off("gameUpdate");
  }, [currentGame._id]);

  // Example function to perform the Income action
  const handleIncome = async () => {
    const res = await fetch("http://localhost:5000/api/games/move", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        gameId: currentGame._id,
        playerId,
        action: "income"
      })
    });
    const updatedGame = await res.json();
    setCurrentGame(updatedGame);
    // You could also rely on socket updates instead of local state.
  };

  // Render basic game state and actions
  return (
    <div>
      <h2>Game Board</h2>
      <p>Treasury: {currentGame.treasury}</p>
      <p>Current Turn: {currentGame.players[currentGame.currentTurn]?.username}</p>
      {/* Render player details */}
      <ul>
        {currentGame.players.map((player) => (
          <li key={player._id}>
            {player.username} – Coins: {player.coins} – Influence:{" "}
            {player.cards.filter((c) => !c.faceUp).length}
          </li>
        ))}
      </ul>
      <div>
        <button onClick={handleIncome}>Income</button>
        {/* Add buttons for Foreign Aid, Coup, and Character actions here */}
      </div>
    </div>
  );
};

export default GameBoard;