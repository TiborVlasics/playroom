const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TicTacToeSchema = new Schema({
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
  boardState: [{ type: String, required: false }],
  isOver: { type: Boolean, default: false },
  createdDate: { type: Date, default: Date.now }
});

module.exports = Message = mongoose.model("tictactoes", TicTacToeSchema);
