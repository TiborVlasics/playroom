const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Game = require("../tavern/Game");

const TicTacToeSchema = new Schema({
  player1: {
    id: { type: Schema.Types.ObjectId, required: true, ref: "users" },
    name: { type: Schema.Types.String, required: true, ref: "users" },
    avatar: { type: Schema.Types.String, required: true, ref: "users" },
    symbol: { type: String, required: false }
  },
  player2: {
    id: { type: Schema.Types.ObjectId, required: false, ref: "users" },
    name: { type: Schema.Types.String, required: false, ref: "users" },
    avatar: { type: Schema.Types.String, required: false, ref: "users" },
    symbol: { type: String, required: false }
  },
  boardState: [{ type: String, required: false }],
  nextPlayer: { type: Schema.Types.ObjectId, default: null }
});

module.exports = Message = Game.discriminator("tictactoes", TicTacToeSchema);
