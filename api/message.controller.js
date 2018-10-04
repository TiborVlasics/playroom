const express = require("express");
const router = express.Router();
const Message = require("../models/message");

router.get("/", (req, res) => {
  Message.find()
    .then(data => res.status(200).json(data))
    .catch(err => console.log(err));
});

module.exports = router;
