const TicTacToe = require("./models/TicTacToe");
const User = require("./models/User");

module.exports = function (io) {
  const games = io.of("/games");

  games.on("connection", function (socket) {
    const user = socket.handshake.headers.user;
    console.log(user.name + " connected to tavern");

    socket.on("disconnect", function () {
      console.log(user.name + " disconnected from tavern");
    });

    socket.on("new game", async function (data) {
      try {
        const user = await User.findOneAndUpdate(
          { _id: data.user.id },
          { $set: { isPlaying: true } },
          { new: true }
        );

        let player1 = {
          id: user._id,
          name: user.name,
          avatar: user.avatar
        };
        const game = await new TicTacToe({ player1: player1 }).save();
        await games.emit("new game", game);
      } catch (err) {
        console.log(err);
      }
    });
  });

  // socket.on("join game", function(data) {});
};
