const Amoeba = require("./Amoeba");
const User = require("../../user/User");

const findGameById = id => {
  return Amoeba.findById({ _id: id });
};

const clearPlayersGame = updatedGame => {
  return User.updateMany(
    { currentGame: updatedGame._id },
    { $set: { currentGame: null } }
  );
};

const updateGame = (gameId, updatedGame) => {
  return Amoeba.findOneAndUpdate(
    { _id: gameId },
    { $set: updatedGame },
    { new: true }
  );
};

module.exports = { findGameById, clearPlayersGame, updateGame };
