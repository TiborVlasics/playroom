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
          .then(next => gameIo.to(game._id).emit("game started", next))
          .catch(err => console.log(err))
      }
    })

    socket.on("move", game => {
      let currentPlayer;
      let nextPlayer;
      if (game.player1.id === game.nextPlayer) {
        currentPlayer = game.player1;
        nextPlayer = game.player2.id;
      } else {
        currentPlayer = game.player2;
        nextPlayer = game.player1.id;
      }

      let newBoardState = game.boardState[game.boardState.length - 1].split("");
      newBoardState[game.move] = currentPlayer.symbol;
      newBoardState = newBoardState.join("")

      TicTacToe.findOneAndUpdate(
        { _id: game._id },
        {
          $set: {
            boardState: game.boardState.concat(newBoardState),
            nextPlayer: nextPlayer
          }
        },
        { new: true }
      ).then(next => gameIo.to(game._id).emit("move", next))
    })
  })
}