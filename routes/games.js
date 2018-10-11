const express = require("express");
const router = express.Router();
const TicTacToe = require("../models/TicTacToe");

/**
 * @route   GET api/games/
 * @desc    Get all games that are not finished yet
 * @access  Public
 * TODO: make it private
 */
router.get("/", (req, res) => {
  TicTacToe.find({ isOver: false })
    .then(game => res.status(200).json(game))
    .catch(err => console.log(err));
});

module.exports = router;
