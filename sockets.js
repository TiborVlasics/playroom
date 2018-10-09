const Message = require("./models/Message");

module.exports = function(server) {
  var io = require("socket.io")(server);

  io.on("connection", function(socket) {
    console.log("user connected");

    socket.on("disconnect", function() {
      console.log("user disconnected");
    });

    socket.on("chat", function(msg) {
      Message.find()
        .sort({ createdDate: -1 })
        .limit(1)
        .then(res => {
          const lastMsg = res[0];
          if (lastMsg && lastMsg.author.name === msg.author.name) {
            Message.findOneAndUpdate(
              { _id: lastMsg._id },
              {
                $set: {
                  text: [...lastMsg.text, msg.text],
                  createdDate: Date.now()
                }
              },
              { new: true }
            )
              .then(message => io.emit("chat", message))
              .catch(err => console.log(err));
          } else {
            new Message({
              author: {
                id: msg.author.id,
                name: msg.author.name
              },
              text: [msg.text],
              thumbnail: msg.author.avatar
            })
              .save()
              .then(message => io.emit("chat", message));
          }
        });
    });
  });

  return io;
};
