const TicTacToe = require("../models/TicTacToe");
const socketHelper = require("../helper/socketHelper")

module.exports = function (io) {
  const game = io.of("/tic-tac-toe");
  let currentConnections = {};

  game.on("connection", function (socket) {
    const user = socket.handshake.headers.user;

    socketHelper.addSocketToConnections(currentConnections, user, game, socket, "tictactoe");

    socket.on("disconnect", () => {
      socketHelper.deleteSocketFromConnections(currentConnections, user, game, socket, "tictactoe");
    });

  })
}