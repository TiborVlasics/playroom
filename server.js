"use strict";

const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const server = app.listen(port, () => console.log(`Server running on ${port}`));
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("./controller/sockets")(server);
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
    }@cluster0-shard-00-00-52ie2.mongodb.net:27017,cluster0-shard-00-01-52ie2.mongodb.net:27017,cluster0-shard-00-02-52ie2.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true`,
    { useNewUrlParser: true }
  )
  .then(() => console.log("Mongodb connected"))
  .catch(err => console.log(err));

module.exports = server;
