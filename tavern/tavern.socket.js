const Pong = require("../pong/Pong");
const User = require("../user/User");
const {
  createTicTacToe,
  updateUsersCurrentGame
} = require("./tavern.functions");

module.exports = function(io, socket, user, connections) {
  socket.on("create game", gameType => {
    if (gameType === "tictactoe") {
      createTicTacToe(user)
        .then(game => {
          updateUsersCurrentGame(game, user)
            .then(() => io.emit("create game", game))
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    } else {
      new Pong({ player1: user })
        .save()
        .then(game => {
          updateUsersCurrentGame(game, user)
            .then(() => io.emit("create game", game))
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    }
  });

  /**
   * @desc Deletes game from io and updates player1's current game to null
   * emits 'unload game' with the deleted game object
   */
  socket.on("delete game", game => {
    Game.findOneAndDelete({ _id: game._id })
      .then(game => {
        User.findOneAndUpdate(
          { _id: game.player1.id },
          { $set: { currentGame: null } }
        ).then(() => io.emit("unload game", game));
      })
      .catch(err => console.log(err));
  });

  /**
   *
   * @desc Puts user to the already existing game object as player2
   * Joining player1 and player2 to a room named of the game's id
   * Emits object everybody in the room
   * @param game  tictactoe object that stores players and game states
   */
  socket.on("join game", function(game) {
    updateUsersCurrentGame(game, user)
      .then(() => {
        Game.findOneAndUpdate(
          { _id: game._id },
          { $set: { player2: user, isFull: true } },
          { new: true }
        ).then(game => {
          const player1 = game.player1.id;
          const player2 = game.player2.id;
          if (connections.hasOwnProperty(player1)) {
            connections[player1].sockets.map(socket => socket.join(game._id));
          }
          if (connections.hasOwnProperty(player2)) {
            connections[player2].sockets.map(socket => socket.join(game._id));
          }
          io.to(game._id).emit("game ready", game);
        });
      })
      .catch(err => console.log(err));
  });
};
