module.exports = function(server) {
  var io = require("socket.io")(server);

  io.on("connection", function(socket) {
    console.log("user connected");

    socket.on("disconnect", function() {
      console.log("user disconnected");
    });

    socket.on("chat", function(data) {
      console.log("user: " + data.name);
      console.log("message: " + data.message);
      io.emit("chat", data);
    });
  });

  return io;
};
