const Message = require("./models/Message");

module.exports = function(io) {
  const chat = io.of("/chat");

  chat.on("connection", function(socket) {
    console.log("User connected to chat");

    io.of("/chat").clients((error, clients) => {
      if (error) throw error;
      console.log(clients);
    });

    socket.on("disconnect", function() {
      console.log("user disconnected from chat");
    });

    socket.on("chat", async function(msg) {
      try {
        let lastMsg = await Message.findOne().sort({ createdDate: -1 });
        if (lastMsg && lastMsg.author.name === msg.author.name) {
          let newMsg = await Message.findOneAndUpdate(
            { _id: lastMsg._id },
            {
              $set: {
                text: [...lastMsg.text, msg.text],
                createdDate: Date.now()
              }
            },
            { new: true }
          );
          chat.emit("chat", newMsg);
        } else {
          let newMessage = await new Message({
            author: {
              id: msg.author.id,
              name: msg.author.name
            },
            text: [msg.text],
            thumbnail: msg.author.avatar
          }).save();
          chat.emit("chat", newMessage);
        }
      } catch (err) {
        socket.broadcast.emit("chat", err);
      }
    });

    socket.on("user typing", function(data) {
      socket.broadcast.emit("user typing", data);
    });
  });
};
