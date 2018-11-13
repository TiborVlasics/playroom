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

  require("./controller/chatSocket")(io);
  require("./controller/gameSocket")(io);
  require("./tic-tac-toe/ticTacToe.socket")(io);

  return io;
};
