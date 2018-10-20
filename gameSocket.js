const TicTacToe = require("./models/TicTacToe");
const User = require("./models/User");

module.exports = function (io) {
  const tavern = io.of("/tavern");

  tavern.on("connection", function (socket) {
    const user = socket.handshake.headers.user;
    console.log(user.name + " connected to tavern");

    socket.on("disconnect", function () {
      console.log(user.name + " disconnected from tavern");
    });

    socket.on("new game", async function (data) {
      try {
        await User.findOneAndUpdate(
          { _id: user.id },
          { $set: { isPlaying: true } },
          { new: true }
        );
        const game = await new TicTacToe({ player1: user }).save();
        await tavern.emit("new game", game);
      } catch (err) {
        console.log(err);
        tavern.emit("error", err)
      }
    });
  });

  // socket.on("join game", function(data) {});
};
