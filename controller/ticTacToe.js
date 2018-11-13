const TicTacToe = require("../models/TicTacToe");
const User = require("../models/User");
const Userlog = require("../models/Userlog");
const socketHelper = require("../helper/socketHelper");
const { updateGame } = require("../helper/ticTacToe.helper");

module.exports = function(io) {
  const gameIo = io.of("/tic-tac-toe");
  let currentConnections = {};

  gameIo.on("connection", function(socket) {
    const user = socket.handshake.headers.user;

    socketHelper.addSocketToConnections(
      currentConnections,
      user,
      gameIo,
      socket,
      "tictactoe"
    );

    socket.on("disconnect", () => {
      socketHelper.deleteSocketFromConnections(
        currentConnections,
        user,
        gameIo,
        socket,
        "tictactoe"
      );
    });

    /**
     * @desc Joins player to a room, identified by the game id, which is sent.
     * If all player connected, sets the game to started,
     * and emits updated game object to all players with an initial state.
     */
    socket.on("join me to a room please", game => {
      socket.join(game._id);
      let user1Connected = currentConnections.hasOwnProperty(game.player1.id);
      let user2Connected = currentConnections.hasOwnProperty(game.player2.id);
      if (user1Connected && user2Connected && game.isStarted === false) {
        TicTacToe.findOneAndUpdate(
          { _id: game._id },
          {
            $set: {
              isStarted: true,
              nextPlayer: game.player1.id,
              boardState: game.boardState.concat("?????????"),
              "player1.symbol": "X",
              "player2.symbol": "O"
            }
          },
          { new: true }
        )
          .then(updatedGame =>
            gameIo.to(game._id).emit("game started", updatedGame)
          )
          .catch(err => console.log(err));
      }
    });

    socket.on("move", game => {
      const updatedGame = updateGame(game);

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
      )
        .then(updatedGame => {
          gameIo.to(game._id).emit("move", updatedGame);

          if (updatedGame.isEnded) {
            User.updateMany(
              { currentGame: updatedGame._id },
              { $set: { currentGame: null } }
            )
              .then(() => {
                let player1Log;
                let player2Log;
                if (updatedGame.winner == "draw") {
                  player1Log = `You drawn in a game of tictactoe against ${
                    updatedGame.player2.name
                  }`;
                  player2Log = `You drawn in a game of tictactoe against ${
                    updatedGame.player1.name
                  }`;
                } else if (updatedGame.winner.equals(updatedGame.player1.id)) {
                  player1Log = `You won a game of tictactoe against ${
                    updatedGame.player2.name
                  }`;
                  player2Log = `You lost a game of tictactoe against ${
                    updatedGame.player1.name
                  }`;
                } else if (updatedGame.winner.equals(updatedGame.player2.id)) {
                  player1Log = `You lost a game of tictactoe against ${
                    updatedGame.player2.name
                  }`;
                  player2Log = `You won a game of tictactoe against ${
                    updatedGame.player1.name
                  }`;
                }

                Userlog.insertMany([
                  { userId: updatedGame.player1.id, text: player1Log },
                  { userId: updatedGame.player2.id, text: player2Log }
                ])
                  .then(() => gameIo.to(game._id).emit("game ended"))
                  .catch(err => console.log(err));
              })
              .catch(err => console.log(err));
          }
        })
        .catch(err => console.log(err));
    });

    socket.on("message", msg => {
      socket.broadcast.to(msg.to).emit("message", msg.text);
    });
  });
};
