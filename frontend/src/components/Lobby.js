import React, { useState } from "react";

const Lobby = ({ onGameCreated, onJoinGame }) => {
  const [username, setUsername] = useState("");
  const [gameId, setGameId] = useState("");

  const handleCreate = async () => {
    const response = await fetch("http://localhost:5000/api/games/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" }
    });
    const game = await response.json();
    // join automatically the created game
    await fetch("http://localhost:5000/api/games/join", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ gameId: game._id, username })
    });
    onGameCreated(game);
  };

  const handleJoin = async () => {
    const response = await fetch("http://localhost:5000/api/games/join", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ gameId, username })
    });
    const game = await response.json();
    onJoinGame(game);
  };

  return (
    <div>
      <h2>Lobby</h2>
      <input
        type="text"
        placeholder="Your username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <div>
        <button onClick={handleCreate}>Create Game</button>
      </div>
      <div>
        <input
          type="text"
          placeholder="Game ID"
          value={gameId}
          onChange={(e) => setGameId(e.target.value)}
        />
        <button onClick={handleJoin}>Join Game</button>
      </div>
    </div>
  );
};

export default Lobby;