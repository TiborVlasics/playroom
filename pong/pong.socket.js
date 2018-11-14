const Pong = require("./Pong");
const User = require("../user/User");
const Userlog = require("../user/Userlog");
const socketHelper = require("../helper/socketHelper");

module.exports = function(io) {
  const gameIo = io.of("/pong");
  let currentConnections = {};

  gameIo.on("connection", function(socket) {
    const user = socket.handshake.headers.user;

    socketHelper.addSocketToConnections(
      currentConnections,
      user,
      gameIo,
      socket,
      "pong"
    );

    socket.on("disconnect", () => {
      socketHelper.deleteSocketFromConnections(
        currentConnections,
        user,
        gameIo,
        socket,
        "pong"
      );
    });

    /**
     * @desc Joins player to a room, identified by the game id, which is sent.
     * If all player connected, sets the game to started,
     * and emits updated game object to all players with an initial state.
     */
    socket.on("ready to start", game => {
      socket.join(game._id);
      let user1Connected = currentConnections.hasOwnProperty(game.player1.id);
      let user2Connected = currentConnections.hasOwnProperty(game.player2.id);
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

    socket.on("move", data => {
      socket.broadcast.to(data.game).emit("move", data.coord);
    });
  });
};
