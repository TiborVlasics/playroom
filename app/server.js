const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const server = app.listen(port, () => console.log(`Server running on ${port}`));
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

require("./sockets")(server);
require("dotenv").config();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/api/user", require("./user/routes"));
app.use("/api/messages", require("./chat/routes"));
app.use("/api/games", require("./games/routes"));

mongoose
  .connect(
    process.env.MONGO_URI,
    { useNewUrlParser: true }
  )
  .then(() => console.log("Mongodb connected"))
  .catch(err => console.log(err));

module.exports = server;
