const {
  addSocketToConnections,
  deleteSocketFromConnections
} = require("./helper/socketHelper");
const jwt = require("jsonwebtoken");

module.exports = function(server) {
  const io = require("socket.io")(server, {
    transports: ["polling", "websocket"]
  });

  io.use((socket, next) => {
    if (socket.handshake.query && socket.handshake.query.token) {
      let token = socket.handshake.query.token;
      token = token.slice(7, token.length).trimLeft();
      jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) return next(new Error("Authentication error"));
        const { iat, exp, ...user } = decoded;
        socket.handshake.headers.user = user;
        next();
      });
    } else {
      next(new Error("Authentication error"));
    }
  });

  let connections = {};
  const lobby = io.of("/");

  lobby.on("connection", function(socket) {
    const user = socket.handshake.headers.user;
    addSocketToConnections(connections, user, lobby, socket);
    console.log("Connection to lobby", user.id, user.name);

    socket.on("disconnect", function() {
      deleteSocketFromConnections(connections, user, lobby, socket);
      console.log("Disconnection from lobby", user.id, user.name);
    });

    require("./chat/chat.socket")(lobby, socket);
    require("./tavern/tavern.socket")(lobby, socket, user, connections);
    require("./tic-tac-toe/ticTacToe.socket")(lobby, socket, connections);

    socket.on("get users", () => {
      let users = [];
      Object.keys(connections).map(key => {
        users.push(connections[key].user);
      });

      lobby.to(socket.id).emit("users", users);
    });
  });

  require("./pong/pong.socket")(io);

  return io;
};
