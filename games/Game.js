const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const options = { discriminatorKey: "kind" };

const gameSchema = new Schema(
  {
    player1: {
      id: { type: Schema.Types.ObjectId, required: true, ref: "users" },
      name: { type: Schema.Types.String, required: true, ref: "users" },
      avatar: { type: Schema.Types.String, required: true, ref: "users" }
    },
    player2: {
      id: { type: Schema.Types.ObjectId, required: false, ref: "users" },
      name: { type: Schema.Types.String, required: false, ref: "users" },
      avatar: { type: Schema.Types.String, required: false, ref: "users" }
    },
    isFull: { type: Boolean, required: false },
    isStarted: { type: Boolean, default: false },
    isEnded: { type: Boolean, default: false },
    createdDate: { type: Date, default: Date.now },
    winner: { type: Schema.Types.ObjectId, default: null }
  },
  options
);
module.exports = Game = mongoose.model("Game", gameSchema);
