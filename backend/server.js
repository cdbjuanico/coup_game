const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const cors = require("cors");
const socketIo = require("socket.io");
const gameRoutes = require("./routes/gameRoutes");

const app = express();
app.use(cors());
app.use(express.json());

// Use game routes
app.use("/api/games", gameRoutes);

const server = http.createServer(app);
const io = socketIo(server, {
  cors: { origin: "*" }
});

// Basic Socket.io connection
io.on("connection", (socket) => {
  console.log("New client connected", socket.id);

  // Optionally, join game rooms (gameId) for targeted updates
  socket.on("joinGame", (gameId) => {
    socket.join(gameId);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected", socket.id);
  });
});

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/mern-coup-game", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB connected");
    server.listen(5000, () => console.log("Server running on port 5000"));
  })
  .catch((err) => console.error(err));