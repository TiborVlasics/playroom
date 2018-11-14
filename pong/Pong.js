const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
  },
  isFull: { type: Boolean, default: false },
  isStarted: { type: Boolean, default: false },
  isEnded: { type: Boolean, default: false },
  createdDate: { type: Date, default: Date.now },
  winner: { type: Schema.Types.ObjectId, default: null }
});

module.exports = Pong = mongoose.model("pongs", PongSchema);
