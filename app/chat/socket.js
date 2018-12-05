const Message = require("./Message");

module.exports = function(chat, socket, connections) {
  socket.on("chat", async msg => {
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

  socket.on("user typing", data => {
    socket.broadcast.emit("user typing", data);
  });

  socket.on("get users", () => {
    let users = [];
    Object.keys(connections).map(key => {
      users.push(connections[key].user);
    });

    chat.to(socket.id).emit("users", users);
  });
};
