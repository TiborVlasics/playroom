const TicTacToe = require("../models/TicTacToe");
const User = require("../models/User");
const socketHelper = require("../helper/socketHelper")

module.exports = function (io) {
  const tavern = io.of("/tavern");
  let currentConnections = {};

  tavern.on("connection", function (socket) {
    const user = socket.handshake.headers.user;
    socketHelper.addSocketToConnections(currentConnections, user, tavern, socket, "tavern");

    socket.on("disconnect", function () {
      socketHelper.deleteSocketFromConnections(currentConnections, user, tavern, socket, "tavern");
    });

    /**
     * @desc Makes a new game and puts the user who requested to it as player1
     * Sets game as user's current game
     * Sends the game back for all users in the tavern to be able to join it
     */
    socket.on("new game", async function () {
      try {
        const game = await new TicTacToe({ player1: user }).save();
        await User.findOneAndUpdate(
          { _id: user.id },
          { $set: { currentGame: game._id } },
          { new: true }
        );
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
     * Emits object everybody in the room
     * @param game  tictactoe object that stores players and game states
     */
    socket.on("join game", function (game) {
      User.findOneAndUpdate(
        { _id: user.id },
        { $set: { currentGame: game._id } },
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

  });

};