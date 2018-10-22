
module.exports = function (io, socket, player) {

  socket.on("move", (game) => {
    io.to(game._id, game)
  })


}