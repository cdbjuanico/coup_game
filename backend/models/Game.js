const mongoose = require("mongoose");

const CardSchema = new mongoose.Schema({
  type: { type: String, required: true },
  faceUp: { type: Boolean, default: false }
});

const PlayerSchema = new mongoose.Schema({
  username: { type: String, required: true },
  coins: { type: Number, default: 2 },
  cards: { type: [CardSchema], default: [] },
  socketId: { type: String } // used for real-time communication
});

const GameSchema = new mongoose.Schema({
  players: [PlayerSchema],
  deck: { type: [String] }, // deck is simply an array of card names
  treasury: { type: Number, default: 50 },
  // Current turn index for the players array
  currentTurn: { type: Number, default: 0 },
  status: { type: String, default: "waiting" } // waiting, in-progress, finished
});

module.exports = mongoose.model("Game", GameSchema);