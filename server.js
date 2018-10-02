const express = require("express");
const app = express();

const mongoose = require("mongoose");
const bodyParser = require("body-parser");

require("dotenv").config();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/user", require("./user/user.controller"));

mongoose
  .connect(
    `mongodb://${process.env.DB_USERNAME}:${
      process.env.DB_PASSWORD
    }@ds213053.mlab.com:13053/ticket_db`,
    { useNewUrlParser: true }
  )
  .then(() => console.log("Mongodb connected"))
  .catch(err => console.log(err));

const port = process.env.PORT || 5000;
const server = app.listen(port, () => console.log(`Server running on ${port}`));
const io = require("socket.io")(server);

io.on("connection", function(socket) {
  console.log("user connected");

  socket.on("disconnect", function() {
    console.log("user disconnected");
  });

  socket.on("chat", function(data) {
    console.log("message: " + data);
    io.emit("chat", data);
  });
});
