const jwtDecode = require("jwt-decode");
const Message = require("./models/Message");

module.exports = function(io) {
  const chat = io.of("/chat");
  chat.users = [];

  chat.on("connection", function(socket) {
    let token = socket.handshake.query.token;
    token = token.slice(7, token.length).trimLeft();
    let user = jwtDecode(token);
    socket.user = user;

    if (!chat.users.some(user => user.id === socket.user.id)) {
      console.log("User connected to chat");
      user.times = 1;
      chat.users = chat.users.concat(user);
      socket.broadcast.emit("user joined", socket.user);
    } else {
      for (let user of chat.users) {
        if (user.id === socket.user.id) {
          user.times += 1;
          break;
        }
      }
    }

    socket.on("disconnect", function() {
      for (let user of chat.users) {
        if (user.id === socket.user.id) {
          if (user.times > 1) {
            user.times -= 1;
            break;
          } else {
            chat.users = chat.users.filter(user => user.id !== socket.user.id);
            chat.emit("user left", socket.user);
            console.log("User disconnected from chat");
            break;
          }
        }
      }
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

    socket.on("get users", () => {
      chat.to(socket.id).emit("users", chat.users);
    });
  });
};
