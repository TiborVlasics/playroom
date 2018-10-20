const Message = require("./models/Message");

module.exports = function (io) {
  const chat = io.of("/chat");
  let currentConnections = {};

  chat.on("connection", client => {
    const user = client.handshake.headers.user;

    if (currentConnections.hasOwnProperty(user.id)) {
      currentConnections[user.id].sockets[client.id] = client;
    } else {
      currentConnections[user.id] = {
        sockets: { [client.id]: client },
        user: user
      };
      client.broadcast.emit("user joined", user);
      console.log(user.name + " connected to chat")
    }

    client.on("disconnect", () => {
      if (Object.keys(currentConnections[user.id].sockets).length === 1) {
        delete currentConnections[user.id];
        console.log(user.name + " disconnected from chat")
        chat.emit("user left", user);
      } else {
        delete currentConnections[user.id].sockets[client.id];
      }
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
