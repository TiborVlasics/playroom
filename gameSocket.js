const TicTacToe = require("./models/TicTacToe");
const User = require("./models/User");

module.exports = function (io) {
  const tavern = io.of("/tavern");
  let currentConnections = {};

  tavern.on("connection", function (socket) {
    const user = socket.handshake.headers.user;

    /**
     * @desc Checks if currentConnections contains the connected users
     * if it does, then puts it to next to as a different session,
     * if it doesn't then makes a new property with the key of the user's ID 
     */
    if (currentConnections.hasOwnProperty(user.id)) {
      currentConnections[user.id].sockets[client.id] = client;
    } else {
      currentConnections[user.id] = {
        sockets: { [client.id]: client },
        user: user
      };
      console.log(user.name + " connected to tavern")
    }

    /**
     * @desc Check if user has more sessions, if she does, 
     * she does not get deleted, just the session. 
     * If she just have 1 session, she get deleted from current connections
     */
    socket.on("disconnect", function () {
      if (Object.keys(currentConnections[user.id].sockets).length === 1) {
        delete currentConnections[user.id];
        console.log(user.name + " disconnected from tavern")
        chat.emit("user left", user);
      } else {
        delete currentConnections[user.id].sockets[client.id];
      }
    });

    /**
     * @desc Makes a new game and puts the user who requested to it as player1
     * Modifies user in mongoDB to "isPlaying"
     * Sends the game back for all users in the tavern to be able to join it as "new game"
     */
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

};
