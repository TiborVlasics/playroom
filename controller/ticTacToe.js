const TicTacToe = require("../models/TicTacToe");
const socketHelper = require("../helper/socketHelper")

module.exports = function (io) {
  const gameIo = io.of("/tic-tac-toe");
  let currentConnections = {};

  gameIo.on("connection", function (socket) {
    const user = socket.handshake.headers.user;

    socketHelper.addSocketToConnections(currentConnections, user, gameIo, socket, "tictactoe");

    socket.on("disconnect", () => {
      socketHelper.deleteSocketFromConnections(currentConnections, user, gameIo, socket, "tictactoe");
    });

    socket.on("join me to a room please", game => {
      socket.join(game._id)
      let user1Connected = currentConnections.hasOwnProperty(game.player1.id);
      let user2Connected = currentConnections.hasOwnProperty(game.player2.id);
      if (user1Connected && user2Connected && game.isStarted === false) {

        TicTacToe.findOneAndUpdate(
          { _id: game._id },
          {
            $set:
            {
              isStarted: true,
              nextPlayer: game.player1.id,
              boardState: game.boardState.concat("?????????")
            }
          },
          { new: true }
        ).then(next => gameIo.to(game._id).emit("game started", next))
      }
    })
  })
}