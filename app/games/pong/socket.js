const { addSocket, removeSocket } = require("../../helper/socketHelper");
const { updateGame } = require("./functions");
const {
  setGameToStarted,
  updateGameToEnded,
  setPlayersGameToNull
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

      initGame(games, game, intervals, pong);
      setGameToStarted(game)
        .then(startedGame => {
          pong.to(startedGame._id).emit("serve game", startedGame);
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
            .then(() => pong.to(endedGame._id).emit("game ended", endedGame))
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    });
  });
};

function initGame(games, game, intervals, pong) {
  if (!games[game._id]) {
    games[game._id] = {
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
      height: 480
    };
  }
  if (!intervals[game._id]) {
    intervals[game._id] = setInterval(() => {
      updateGame(games[game._id]);
      pong.to(game._id).emit("update", games[game._id]);
    }, 1000 / 40);
  }
}
