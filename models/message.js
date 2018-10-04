const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  author: {
    id: { type: Schema.Types.ObjectId, required: true, ref: "users" },
    name: { type: String, required: true }
  },
  text: { type: String, required: true },
  thumbnail: { type: String, required: true },
  createdDate: { type: Date, default: Date.now }
});

module.exports = Message = mongoose.model("messages", MessageSchema);
