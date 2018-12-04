const TicTacToe = require("./amoeba/Amoeba");
const User = require("../user/User");

function createTicTacToe(player) {
  return new TicTacToe({
    player1: player,
    isFull: false
  }).save();
}

function updateUsersCurrentGame(game, user) {
  return User.findOneAndUpdate(
    { _id: user.id },
    { $set: { currentGame: game._id } },
    { new: true }
  );
}

module.exports = { createTicTacToe, updateUsersCurrentGame };
