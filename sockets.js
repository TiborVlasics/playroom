const jwt = require("jsonwebtoken");
const jwtDecode = require("jwt-decode");

module.exports = function(server) {
  var io = require("socket.io")(server, {
    transports: ["polling", "websocket"]
  });

  io.use((socket, next) => {
    if (socket.handshake.query && socket.handshake.query.token) {
      let token = socket.handshake.query.token;
      token = token.slice(7, token.length).trimLeft();
      jwt.verify(token, process.env.SECRET_KEY, function(err, decoded) {
        if (err) return next(new Error("Authentication error"));
        next();
      });
    } else {
      next(new Error("Authentication error"));
    }
  });

  require("./chatSocket")(io);
  require("./gameSocket")(io);

  return io;
};
