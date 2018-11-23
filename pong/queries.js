const User = require("../user/User");
const Pong = require("./Pong");

const findGameById = id => Pong.findById({ _id: id });

const setGameToStarted = game =>
  Pong.findOneAndUpdate(
    { _id: game._id },
    { $set: { isStarted: true } },
    { new: true }
  );

const updateGameToEnded = game =>
  Pong.findOneAndUpdate(
    { _id: game._id },
    { $set: { isEnded: true } },
    { new: true }
  );

const setPlayersGameToNull = game =>
  User.updateMany({ currentGame: game._id }, { $set: { currentGame: null } });

module.exports = {
  setGameToStarted,
  updateGameToEnded,
  setPlayersGameToNull,
  findGameById
};
