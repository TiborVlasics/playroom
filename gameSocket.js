module.exports = function(io, socket) {
  socket.on("new game", function(game) {
    console.log(game);
  });
};
