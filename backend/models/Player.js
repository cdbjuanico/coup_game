const mongoose = require("mongoose");

const PlayerSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  coins: { type: Number, default: 2 },
  influence: { type: Number, default: 2 },
  characters: [{ type: String }], // Stores face-down character cards
  gameId: { type: mongoose.Schema.Types.ObjectId, ref: "GameSession" },
});

module.exports = mongoose.model("Player", PlayerSchema);