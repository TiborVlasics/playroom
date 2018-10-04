const Message = require("./models/message");

module.exports = function(server) {
  var io = require("socket.io")(server);

  io.on("connection", function(socket) {
    console.log("user connected");

    socket.on("disconnect", function() {
      console.log("user disconnected");
    });

    socket.on("chat", function(data) {
      Message.find()
        .sort({ $natural: -1 })
        .limit(1)
        .then(res => {
          const latestMessage = res[0];
          const newMessage = new Message({
            author: {
              id: data.user.id,
              name: data.user.name
            },
            text: data.message,
            thumbnail: data.user.avatar
          });

          if (latestMessage.author.name === data.user.name) {
            Message.updateOne(
              { _id: latestMessage._id },
              {
                $set: {
                  text: latestMessage.text + "\n" + data.message,
                  createdDate: data.timestamp
                }
              }
            ).then(io.emit("chat", data));
          } else {
            newMessage.save().then(io.emit("chat", data));
          }
        });
    });
  });

  return io;
};
