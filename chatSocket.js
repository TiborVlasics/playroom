const Message = require("./models/Message");
const socketHelper = require("./helper/socketHelper")


module.exports = function (io) {
  const chat = io.of("/chat");
  let currentConnections = {};

  chat.on("connection", client => {
    const user = client.handshake.headers.user;
    socketHelper.addSocketToConnections(currentConnections, user, chat, client, "chat");

    client.on("disconnect", () => {
      socketHelper.deleteSocketFromConnections(currentConnections, user, chat, client, "chat");
    });

    client.on("private", data => {
      currentConnections[data.to].emit("private", {
        from: client.user.id,
        msg: data.text
      });
    });

    client.on("chat", async msg => {
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
        client.broadcast.emit("chat", err);
      }
    });

    client.on("user typing", data => {
      client.broadcast.emit("user typing", data);
    });

    client.on("get users", () => {
      let users = [];
      Object.keys(currentConnections).map(key => {
        users.push(currentConnections[key].user);
      });

      chat.to(client.id).emit("users", users);
    });
  });
};
