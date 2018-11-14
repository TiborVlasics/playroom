const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const options = { discriminatorKey: "kind" };

const gameSchema = new Schema(
  {
    isFull: { type: Boolean, required: false },
    isStarted: { type: Boolean, default: false },
    isEnded: { type: Boolean, default: false },
    createdDate: { type: Date, default: Date.now },
    winner: { type: Schema.Types.ObjectId, default: null }
  },
  options
);
module.exports = Game = mongoose.model("Game", gameSchema);
