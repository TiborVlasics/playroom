const { addSocket, removeSocket } = require("../helper/socketHelper");
const { updateGame, initGame } = require("./functions");
const {
  setGameToStarted,
  updateGameToEnded,
  setPlayersGameToNull,
  findGameById
} = require("./queries");

module.exports = function(io) {
  const pong = io.of("/pong");
  let connections = {};
  let games = {};
  let intervals = {};

  pong.on("connection", socket => {
    const user = socket.handshake.headers.user;
    addSocket(connections, user, pong, socket);
    console.log("Connection to Pong", user.id, user.name);

    socket.on("disconnect", () => {
      removeSocket(connections, user, pong, socket);
      console.log("Disconnection from pong", user.id, user.name);
    });

    socket.on("subscribe", game => {
      socket.join(game._id);

      if (!game.isStarted) {
        setGameToStarted(game)
          .then(startedGame => {
            pong.to(startedGame._id).emit("serve game", startedGame);

            if (!games.hasOwnProperty(startedGame._id)) {
              initGame(games, startedGame);

              intervals[startedGame._id] = setInterval(() => {
                updateGame(games[startedGame._id]);
                pong.to(startedGame._id).emit("update", games[startedGame._id]);
              }, 1000 / 30);
            }
          })
          .catch(err => console.log(err));
      } else {
        findGameById(game._id)
          .then(game => socket.emit("serve game", game))
          .catch(err => console.log(err));
      }
    });

    socket.on("move", data => {
      const moveKey = Object.keys(data.move)[0];
      games[data.id][moveKey] = data.move[moveKey];
    });

    socket.on("surrender", game => {
      clearInterval(intervals[game._id]);

      updateGameToEnded(game)
        .then(endedGame => {
          setPlayersGameToNull(endedGame)
            .then(() => pong.to(endedGame._id).emit("game ended", endedGame))
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    });
  });
};
