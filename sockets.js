module.exports = function(server) {
  var io = require("socket.io")(server);

  io.on("connection", function(socket) {
    console.log("user connected");

    socket.on("disconnect", function() {
      console.log("user disconnected");
    });

    require("./chatSocket")(io, socket);
    require("./gameSocket")(io, socket);

    socket.on("user typing", function(data) {
      socket.broadcast.emit("user typing", data);
    });
  });

  return io;
};
