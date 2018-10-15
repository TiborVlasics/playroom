"use strict";

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
app.use("/api/user", require("./routes/users"));
app.use("/api/messages", require("./routes/chatMessages"));
app.use("/api/games", require("./routes/games"));

mongoose
  .connect(
    `mongodb://${process.env.DB_USERNAME}:${
      process.env.DB_PASSWORD
    }@ds213053.mlab.com:13053/ticket_db`,
    { useNewUrlParser: true }
  )
  .then(() => console.log("Mongodb connected"))
  .catch(err => console.log(err));

module.exports = server;
