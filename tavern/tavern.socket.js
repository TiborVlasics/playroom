const TicTacToe = require("../tic-tac-toe/TicTacToe.model");
const Pong = require("../pong/Pong");
const User = require("../user/User");
const socketHelper = require("../helper/socketHelper");
const {
  createTicTacToe,
  updateUsersCurrentGame
} = require("./tavern.functions");

module.exports = function(io) {
  const tavern = io.of("/tavern");
  let currentConnections = {};

  tavern.on("connection", function(socket) {
    const user = socket.handshake.headers.user;

    socketHelper.addSocketToConnections(
      currentConnections,
      user,
      tavern,
      socket,
      "tavern"
    );

    socket.on("disconnect", function() {
      socketHelper.deleteSocketFromConnections(
        currentConnections,
        user,
        tavern,
        socket,
        "tavern"
      );
    });

    socket.on("new game", gameType => {
      if (gameType === "tictactoe") {
        createTicTacToe(user)
          .then(game => {
            game = game.toObject();
            game.type = "tictactoe";
            updateUsersCurrentGame(game, user)
              .then(() => tavern.emit("new game", game))
              .catch(err => console.log(err));
          })
          .catch(err => console.log(err));
      } else {
        new Pong({ player1: user })
          .save()
          .then(game => console.log(game))
          .catch(err => console.log(err));
      }
    });

    /**
     * @desc Deletes game from tavern and updates player1's current game to null
     * emits 'unload game' with the deleted game object
     */
    socket.on("delete game", game => {
      TicTacToe.findOneAndDelete({ _id: game._id })
        .then(game => {
          User.findOneAndUpdate(
            { _id: game.player1.id },
            { $set: { currentGame: null } }
          ).then(() => tavern.emit("unload game", game));
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
        .then(
          TicTacToe.findOneAndUpdate(
            { _id: game._id },
            { $set: { player2: user, isFull: true } },
            { new: true }
          ).then(game => {
            const player1 = game.player1.id;
            const player2 = game.player2.id;
            if (currentConnections.hasOwnProperty(player1)) {
              currentConnections[player1].sockets.map(socket =>
                socket.join(game._id)
              );
            }
            if (currentConnections.hasOwnProperty(player2)) {
              currentConnections[player2].sockets.map(socket =>
                socket.join(game._id)
              );
            }
            tavern.to(game._id).emit("game is ready to start", game);
          })
        )
        .catch(err => console.log(err));
    });
  });
};
