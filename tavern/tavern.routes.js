const express = require("express");
const router = express.Router();
const TicTacToe = require("../tic-tac-toe/TicTacToe.model");
const Game = require("./Game");
const passport = require("passport");
require("../config/passport")(passport);

/**
 * @route   GET api/games/
 * @desc    Get all games that are not finished yet
 * @access  Private
 */
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Game.find({ isEnded: false })
      .then(game => res.status(200).json(game))
      .catch(err => console.log(err));
  }
);

/**
 * @route   GET api/games/:id
 * @desc    Get a specific game by id
 * @access  Private
 */
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    TicTacToe.findOne({ _id: req.params.id })
      .then(game => res.status(200).json(game))
      .catch(err => console.log(err));
  }
);

module.exports = router;
