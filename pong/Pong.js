const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Game = require("../tavern/Game");

const PongSchema = new Schema({
  player1: { score: { type: Number, default: 0 } },
  player2: { score: { type: Number, required: false } }
});

module.exports = Pong = Game.discriminator("pongs", PongSchema);
