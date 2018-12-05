const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Game = require("../Game");

const AmoebaSchema = new Schema({
  player1: { symbol: { type: String, default: "x" } },
  player2: { symbol: { type: String, required: false } },
  boardState: [{ type: String, required: false }],
  nextPlayer: { type: Schema.Types.ObjectId, default: null }
});

module.exports = Amoeba = Game.discriminator("amoebas", AmoebaSchema);
