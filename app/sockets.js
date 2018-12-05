const { addSocket, removeSocket } = require("./helper/socketHelper");

module.exports = function(server) {
  const io = require("socket.io")(server, {
    transports: ["polling", "websocket"]
  });

  require("./config/socket.io")(io);

  let connections = {};

  const lobby = io.of("/");

  lobby.on("connection", function(socket) {
    const user = socket.handshake.headers.user;
    addSocket(connections, user, lobby, socket);
    console.log("Connection to lobby", user.id, user.name);

    socket.on("disconnect", function() {
      removeSocket(connections, user, lobby, socket);
      console.log("Disconnection from lobby", user.id, user.name);
    });

    require("./chat/socket")(lobby, socket, connections);
    require("./games/socket")(lobby, socket, user, connections);
    require("./games/amoeba/socket")(lobby, socket, connections, user);
  });

  require("./games/pong/socket")(io);

  return io;
};
