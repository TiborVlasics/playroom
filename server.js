const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose
  .connect(
    `mongodb://${process.env.DB_USERNAME}:${
      process.env.DB_PASSWORD
    }@ds213053.mlab.com:13053/ticket_db`,
    { useNewUrlParser: true }
  )
  .then(() => console.log("Mongodb connected"))
  .catch(err => console.log(err));

app.use("/users", require("./user/user.controller"));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on ${port}`));
