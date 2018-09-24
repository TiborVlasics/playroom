const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

router.get("/", (req, res) => {
  res.json({ msg: "users works" });
});

module.exports = router;
