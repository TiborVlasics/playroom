const Message = require("./models/message");

module.exports = function(server) {
  var io = require("socket.io")(server);

  io.on("connection", function(socket) {
    console.log("user connected");

    socket.on("disconnect", function() {
      console.log("user disconnected");
    });

    socket.on("chat", function(data) {
      const newMessage = new Message({
        author: {
          id: data.user.id,
          name: data.user.name
        },
        text: data.message,
        thumbnail: data.user.avatar
      });
      newMessage.save();

      io.emit("chat", data);
    });
  });

  return io;
};
