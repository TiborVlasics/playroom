const { addSocket, removeSocket } = require("../../helper/socketHelper");
const { initGame } = require("./functions");
const {
  setGameToStarted,
  updateGameToEnded,
  setPlayersGameToNull
} = require("./queries");

module.exports = function(io) {
  const server = io.of("/pong");

  let connections = {};
  let games = {};
  let intervals = {};

  server.on("connection", socket => {
    const user = socket.handshake.headers.user;
    addSocket(connections, user, server, socket);
    console.log("Connection to Pong", user.id, user.name);

    socket.on("disconnect", () => {
      removeSocket(connections, user, server, socket);
      console.log("Disconnection from pong", user.id, user.name);
    });

    socket.on("subscribe", game => {
      socket.join(game._id);

      initGame(games, game, intervals, server);
      setGameToStarted(game)
        .then(startedGame => {
          server.to(startedGame._id).emit("serve game", startedGame);
        })
        .catch(err => console.log(err));
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
            .then(() => server.to(endedGame._id).emit("game ended", endedGame))
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    });
  });
};
