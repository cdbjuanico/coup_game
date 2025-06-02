const io = require("socket.io")(server);

io.on("connection", (socket) => {
  console.log("Player connected:", socket.id);

  socket.on("action", (data) => {
    const { action, playerId, targetId } = data;

    switch (action) {
      case "income":
        updateCoins(playerId, 1);
        break;
      case "foreign_aid":
        updateCoins(playerId, 2);
        break;
      case "coup":
        if (getCoins(playerId) >= 7) {
          removeInfluence(targetId);
        }
        break;
      case "duke":
        updateCoins(playerId, 3);
        break;
      case "assassin":
        if (getCoins(playerId) >= 3) {
          attemptAssassination(targetId);
        }
        break;
      default:
        console.log("Invalid action");
    }

    io.emit("gameUpdate", getGameState());
  });

  socket.on("disconnect", () => {
    console.log("Player disconnected:", socket.id);
  });
});