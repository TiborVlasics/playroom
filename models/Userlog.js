const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserlogSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, required: true, ref: "users" },
  text: { type: String, required: true },
  createdDate: { type: Date, default: Date.now }
});

module.exports = Userlog = mongoose.model("history", UserlogSchema);
