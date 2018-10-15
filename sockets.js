module.exports = function(server) {
  var io = require("socket.io")(server);

  require("./chatSocket")(io);
  require("./gameSocket")(io);

  return io;
};
