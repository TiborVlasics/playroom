const Message = require("./models/Message");

module.exports = function(server) {
  var io = require("socket.io")(server);

  io.on("connection", function(socket) {
    console.log("user connected");

    socket.on("disconnect", function() {
      console.log("user disconnected");
    });

    socket.on("chat", function(message) {
      Message.find()
        .sort({ createdDate: -1 })
        .limit(1)
        .then(res => {
          const latestMessage = res[0];
          const newMessage = new Message({
            author: {
              id: message.author.id,
              name: message.author.name
            },
            text: [message.text],
            thumbnail: message.author.avatar
          });

          if (
            latestMessage &&
            latestMessage.author.name === message.author.name
          ) {
            Message.findOneAndUpdate(
              { _id: latestMessage._id },
              {
                $set: {
                  text: [...latestMessage.text, message.text],
                  createdDate: Date.now()
                }
              },
              { new: true }
            )
              .then(data => {
                io.emit("chat", data);
              })
              .catch(err => console.log(err));
          } else {
            newMessage.save().then(message => {
              io.emit("chat", message);
            });
          }
        });
    });
  });

  return io;
};
