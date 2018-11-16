const Pong = require("./Pong");
const User = require("../user/User");

module.exports = function(gameIo, socket, connections) {
  socket.on("ready to start", game => {
    socket.join(game._id);
    let user1Connected = connections.hasOwnProperty(game.player1.id);
    let user2Connected = connections.hasOwnProperty(game.player2.id);
    if (user1Connected && user2Connected && game.isStarted === false) {
      Pong.findOneAndUpdate(
        { _id: game._id },
        {
          $set: {
            isStarted: true,
            "player1.score": 0,
            "player2.score": 0
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

  socket.on("move y", data => {
    socket.broadcast.to(data.game).emit("move", data.coord);
  });

  socket.on("score", data => {
    if (data.score.score2 >= 10 || data.score.score1 >= 10) {
      Pong.findOneAndUpdate(
        { _id: data.game },
        {
          $set: {
            isEnded: true
          }
        },
        { new: true }
      )
        .then(updatedGame => {
          User.updateMany(
            { currentGame: data.game },
            { $set: { currentGame: null } }
          )
            .then(() => {
              return gameIo.to(data.game).emit("game over");
            })
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    }

    let ballPosition = { bx: 320, by: 240, xv: 4, yv: 4 };
    if (data.score.score2) ballPosition.xv = -4;

    gameIo.to(data.game).emit("ball to middle", {
      ballPosition: ballPosition,
      score: data.score
    });
  });
};
