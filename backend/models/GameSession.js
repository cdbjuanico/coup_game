const mongoose = require("mongoose");

const GameSessionSchema = new mongoose.Schema({
  players: [{ type: mongoose.Schema.Types.ObjectId, ref: "Player" }],
  deck: [{ type: String }], // Stores shuffled character cards
  currentTurn: { type: Number, default: 0 },
  treasury: { type: Number, default: 50 },
  isActive: { type: Boolean, default: true },
});

module.exports = mongoose.model("GameSession", GameSessionSchema);