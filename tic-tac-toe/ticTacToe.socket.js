const TicTacToe = require("./TicTacToe.model");
const User = require("../user/User");
const { updateGame } = require("./ticTacToe.functions");

module.exports = function(io, socket, connections) {
  socket.on("subscribe", game => {
    socket.join(game._id);

    io.in(game._id).clients((error, clients) => {
      if (error) throw error;
      console.log("clients in room", clients);
    });

    if (!game.isStarted) {
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
        .then(updatedGame => socket.emit("game started", updatedGame))
        .catch(err => console.log(err));
    } else {
      TicTacToe.findById({ _id: game._id }).then(game =>
        socket.emit("game started", game)
      );
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
        io.to(game._id).emit("move", updatedGame);

        if (updatedGame.isEnded) {
          User.updateMany(
            { currentGame: updatedGame._id },
            { $set: { currentGame: null } }
          )
            .then(() => io.to(game._id).emit("game ended"))
            .catch(err => console.log(err));
        }
      })
      .catch(err => console.log(err));
  });
};
