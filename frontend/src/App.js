import React, { useState } from "react";
import Lobby from "./components/Lobby";
import GameBoard from "./components/GameBoard";

function App() {
  const [game, setGame] = useState(null);
  const [playerId, setPlayerId] = useState(null);

  // onGameCreated and onJoinGame callbacks simply set the game state.
  const handleGameCreated = (newGame) => {
    setGame(newGame);
    // Determine playerId from newGame.players (e.g., last inserted)
    setPlayerId(newGame.players[newGame.players.length - 1]._id);
  };

  const handleJoinGame = (joinedGame) => {
    setGame(joinedGame);
    setPlayerId(joinedGame.players[joinedGame.players.length - 1]._id);
  };

  return (
    <div className="App">
      {!game ? (
        <Lobby onGameCreated={handleGameCreated} onJoinGame={handleJoinGame} />
      ) : (
        <GameBoard game={game} playerId={playerId} />
      )}
    </div>
  );
}

export default App;