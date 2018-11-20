const Pong = require("./Pong");
const User = require("../user/User");
const {
  addSocketToConnections,
  deleteSocketFromConnections
} = require("../helper/socketHelper");

module.exports = function(io) {
  let connections = {};
  const pong = io.of("/pong");

  pong.on("connection", function(socket) {
    const user = socket.handshake.headers.user;
    addSocketToConnections(connections, user, pong, socket);
    console.log("Connection to Pong", user.id, user.name);

    socket.on("disconnect", function() {
      deleteSocketFromConnections(connections, user, pong, socket);
      console.log("Disconnection from pong", user.id, user.name);
    });

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
            pong.to(game._id).emit("game started", updatedGame)
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
                return pong.to(data.game).emit("game over");
              })
              .catch(err => console.log(err));
          })
          .catch(err => console.log(err));
      }

      let ballPosition = { bx: 320, by: 240, xv: 4, yv: 4 };
      if (data.score.score2) ballPosition.xv = -4;

      pong.to(data.game).emit("ball to middle", {
        ballPosition: ballPosition,
        score: data.score
      });
    });
  });
};
