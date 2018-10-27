const TicTacToe = require("../models/TicTacToe");
const socketHelper = require("../helper/socketHelper")
const { updateGame } = require("../helper/ticTacToe.helper")


module.exports = function (io) {
  const gameIo = io.of("/tic-tac-toe");
  let currentConnections = {};

  gameIo.on("connection", function (socket) {
    const user = socket.handshake.headers.user;

    socketHelper.addSocketToConnections(currentConnections, user, gameIo, socket, "tictactoe");

    socket.on("disconnect", () => {
      socketHelper.deleteSocketFromConnections(currentConnections, user, gameIo, socket, "tictactoe");
    });

    /**
     * @desc Joins player to a room, identified by the game id, which is sent.
     * If all player connected, sets the game to started, 
     * and emits updated game object to all players with an initial state.
     */
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
              boardState: game.boardState.concat("?????????"),
              'player1.symbol': "X",
              'player2.symbol': "O"
            }
          },
          { new: true }
        )
          .then(updatedGame => gameIo.to(game._id).emit("game started", updatedGame))
          .catch(err => console.log(err))
      }
    })

    socket.on("move", game => {
      const updatedGame = updateGame(game)

      TicTacToe.findOneAndUpdate(
        { _id: game._id },
        {
          $set: {
            boardState: game.boardState.concat(updatedGame.gameString),
            nextPlayer: updatedGame.nextPlayer,
            winner: updatedGame.winner,
            isEnded: updatedGame.isEnded
          }
        },
        { new: true }
      ).then(updatedGame => gameIo.to(game._id).emit("move", updatedGame))
    })
  })
}