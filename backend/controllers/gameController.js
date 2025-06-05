const Game = require("../models/Game");
const { initializeDeck } = require("../utils/helpers");

// Create a new game session
exports.createGame = async (req, res) => {
  try {
    const deck = initializeDeck();
    const game = new Game({
      deck,
      treasury: 50,
      currentTurn: 0,
      players: [] // players will join later
    });
    await game.save();
    res.status(201).json(game);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Join a game session
exports.joinGame = async (req, res) => {
  try {
    const { gameId, username } = req.body;
    let game = await Game.findById(gameId);
    if (!game) {
      return res.status(404).json({ message: "Game not found." });
    }
    // Prevent duplicate usernames, etc. as needed.
    // Also, deal two cards to the player upon join.
    const startingCards = [game.deck.pop(), game.deck.pop()];
    game.players.push({
      username,
      coins: 2,
      cards: startingCards.map((c) => ({ type: c, faceUp: false }))
    });
    await game.save();
    res.status(200).json(game);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Process a player's move (Income, Foreign Aid, Coup, or Character Actions)
exports.processMove = async (req, res) => {
  try {
    const { gameId, playerId, action, targetId } = req.body;
    let game = await Game.findById(gameId);
    if (!game) return res.status(404).json({ message: "Game not found." });
    
    // A simple example for Income action:
    if (action === "income") {
      // Make sure it’s the player’s turn
      if (game.players[game.currentTurn]._id.toString() !== playerId) {
        return res.status(400).json({ message: "Not your turn." });
      }
      const player = game.players.id(playerId);
      player.coins += 1;
    }
    // Process other actions: foreign aid, coup, and any character-specific actions
    // Each character action should include the proper coin exchange and challenge logic.
    // For example, the Duke action would add 3 coins and need to block foreign aid.
    // Likewise, handle challenges wherein you compare the declared action with the player’s actual cards.
    // If player reveals the appropriate character, swap that card with one from the deck.
    
    // After processing, update turn (you can use a modulus on players.length)
    game.currentTurn = (game.currentTurn + 1) % game.players.length;
    await game.save();

    // Optionally: emit an event via Socket.io to update all connected clients
    // io.to(gameId).emit("gameUpdate", game);
    res.status(200).json(game);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};