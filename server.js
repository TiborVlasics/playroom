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
app.use("/user", require("./user/user.controller"));
app.use("/messages", require("./controller/messageController"));

mongoose
  .connect(
    `mongodb://${process.env.DB_USERNAME}:${
      process.env.DB_PASSWORD
    }@ds213053.mlab.com:13053/ticket_db`,
    { useNewUrlParser: true }
  )
  .then(() => console.log("Mongodb connected"))
  .catch(err => console.log(err));
