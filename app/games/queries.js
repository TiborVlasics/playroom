const Amoeba = require("./amoeba/Amoeba");
const User = require("../user/User");

function createAmoeba(player) {
  return new Amoeba({
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

module.exports = { createAmoeba, updateUsersCurrentGame };
