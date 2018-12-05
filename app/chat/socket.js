const Message = require("./Message");
const { createNewMessage, addTextToLastMessage } = require("./queries");

module.exports = function(chat, socket, connections) {
  socket.on("chat", message => {
    Message.findOne()
      .sort({ createdDate: -1 })
      .then(latestMessage => {
        if (
          latestMessage &&
          latestMessage.author.name === message.author.name
        ) {
          return addTextToLastMessage(latestMessage, message);
        } else {
          return createNewMessage(message);
        }
      })
      .then(newMessage => chat.emit("chat", newMessage))
      .catch(err => console.log(err));
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
