const Pong = require("./Pong");
const User = require("../user/User");
const {
  addSocketToConnections,
  deleteSocketFromConnections
} = require("../helper/socketHelper");

module.exports = function(io) {
  const pong = io.of("/pong");
  let connections = {};
  let games = {};
  let intervals = {};

  pong.on("connection", socket => {
    const user = socket.handshake.headers.user;
    addSocketToConnections(connections, user, pong, socket);
    console.log("Connection to Pong", user.id, user.name);

    socket.on("disconnect", () => {
      deleteSocketFromConnections(connections, user, pong, socket);
      console.log("Disconnection from pong", user.id, user.name);
    });

    socket.on("join", game => {
      socket.join(game._id);
      if (!game.isStarted) {
        Pong.findOneAndUpdate(
          { _id: game._id },
          { $set: { isStarted: true } },
          { new: true }
        )
          .then(updatedGame => {
            pong.to(updatedGame._id).emit("game started", updatedGame);

            if (!games.hasOwnProperty(updatedGame._id)) {
              games[updatedGame._id] = {
                p1y: 40,
                p2y: 40,
                pt: 10,
                ph: 100,
                bx: 50,
                by: 50,
                xv: 4,
                yv: 4,
                bd: 7,
                score1: 0,
                score2: 0,
                width: 640,
                height: 780
              };

              intervals[updatedGame._id] = setInterval(() => {
                update(games[updatedGame._id]);
                pong.to(updatedGame._id).emit("update", games[updatedGame._id]);
              }, 1000);
            }
          })
          .catch(err => console.log(err));
      } else {
        Pong.findById({ _id: game._id })
          .then(game => socket.emit("game started", game))
          .catch(err => console.log(err));
      }
    });

    function update(game) {
      console.log(game);
      game.bx = game.bx + game.xv;
      game.by = game.by + game.yv;

      if (game.by < 0 && game.yv < 0) {
        game.yv = -game.yv;
      }
      if (game.by > game.height && game.yv > 0) {
        game.yv = -game.yv;
      }
      if (game.bx < 0) {
        if (game.by > game.p1y && game.by < game.p1y + game.ph) {
          game.xv = -game.xv;
          const dy = game.by - (game.p1y + game.ph / 2);
          game.yv = dy * 0.3;
        } else {
          game.score2 = game.score2 + 1;
          game.bx = 320;
          game.by = 240;
          game.xv = 4;
          game.yv = 4;
        }
      }
      if (game.bx > game.width) {
        if (game.by > game.p2y && game.by < game.p2y + game.ph) {
          game.xv = -game.xv;
          const dy = game.by - (game.p2y + game.ph / 2);
          game.yv = dy * 0.3;
        } else {
          game.score1 = game.score1 + 1;
          game.bx = 320;
          game.by = 240;
          game.xv = 4;
          game.yv = 4;
        }
      }
    }

    socket.on("move", data => {
      const moveKey = Object.keys(data.move)[0];
      games[data.id][moveKey] = data.move[moveKey];
    });

    function onGameOver(game) {
      Pong.findOneAndUpdate(
        { _id: game._id },
        { $set: { isEnded: true } },
        { new: true }
      )
        .then(updatedGame => {
          User.updateMany(
            { currentGame: updatedGame._id },
            { $set: { currentGame: null } }
          )
            .then(() => pong.to(game._id).emit("game over"))
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    }
  });
};
