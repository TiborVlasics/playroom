const Message = require("./models/Message");

module.exports = function(io, socket) {
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
        io.emit("chat", newMsg);
      } else {
        let newMessage = await new Message({
          author: {
            id: msg.author.id,
            name: msg.author.name
          },
          text: [msg.text],
          thumbnail: msg.author.avatar
        }).save();
        io.emit("chat", newMessage);
      }
    } catch (err) {
      socket.broadcast.emit("chat", err);
    }
  });
};
