const TicTacToe = require("./models/TicTacToe");

module.exports = function(io, socket) {
  socket.on("new game", function(data) {
    let player1 = {
      id: data.user.id,
      name: data.user.name,
      avatar: data.user.avatar
    };
    new TicTacToe({ player1: player1 })
      .save()
      .then(game => socket.emit("new game", game));
  });
};
