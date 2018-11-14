const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Game = require("../tavern/Game");

const PongSchema = new Schema({
  player1: {
    id: { type: Schema.Types.ObjectId, required: true, ref: "users" },
    name: { type: Schema.Types.String, required: true, ref: "users" },
    avatar: { type: Schema.Types.String, required: true, ref: "users" },
    score: { type: Number, default: 0 }
  },
  player2: {
    id: { type: Schema.Types.ObjectId, required: false, ref: "users" },
    name: { type: Schema.Types.String, required: false, ref: "users" },
    avatar: { type: Schema.Types.String, required: false, ref: "users" },
    score: { type: Number, required: false }
  }
});

module.exports = Pong = Game.discriminator("pongs", PongSchema);
