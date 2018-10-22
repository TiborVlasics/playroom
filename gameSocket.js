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
      currentConnections[user.id].sockets.push(socket);
    } else {
      currentConnections[user.id] = {
        sockets: [socket],
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
      if (currentConnections[user.id].sockets.length === 1) {
        delete currentConnections[user.id];
        console.log(user.name + " disconnected from tavern")
        tavern.emit("user left", user);
      } else {
        currentConnections[user.id].sockets = currentConnections[user.id].sockets
          .filter(client => client.id !== socket.id)
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

    /**
     * 
     * @desc Puts user to the already existing game object as player2
     * Joining player1 and player2 to a room named of the game's id
     * Sending the game object to all sockets in the room
     */
    socket.on("join game", function (game) {
      User.findOneAndUpdate(
        { _id: user.id },
        { $set: { isPlaying: true } },
        { new: true }
      ).then(TicTacToe.findOneAndUpdate(
        { _id: game._id },
        { $set: { player2: user, isStarted: true } },
        { new: true }
      ).then(game => {
        const player1 = game.player1.id;
        const player2 = game.player2.id;
        if (currentConnections.hasOwnProperty(player1)) {
          currentConnections[player1].sockets.map(socket => socket.join(game._id))
        }
        if (currentConnections.hasOwnProperty(player2)) {
          currentConnections[player2].sockets.map(socket => socket.join(game._id))
        }
        tavern.to(game._id).emit("game starting", game)
      })).catch(err => console.log(err))
    });

    require("./ticTacToe")(tavern, socket, user);
  });

};
