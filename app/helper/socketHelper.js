/**
 * @desc Check if user has more sessions, if she does,
 * she does not get deleted, just the session.
 * If she just have 1 session, she get deleted from current connections
 * @param: {object} currentConnections    object that stores connections, in an array for every user
 * @param: {object} user                  user object with name property
 * @param: {object} io                    io object
 * @param: {object} socket                socket object
 * @param: {string} namespace             used for logging
 */
function removeSocket(currentConnections, user, io, socket) {
  if (currentConnections[user.id].sockets.length === 1) {
    delete currentConnections[user.id];
    io.emit("user left", user);
  } else {
    currentConnections[user.id].sockets = currentConnections[
      user.id
    ].sockets.filter(client => client.id !== socket.id);
  }
}

/**
 * @desc Checks if currentConnections contains the connected user
 * if it does, then puts the new socket next to the others under the user's id,
 * if it doesn't then makes a new property with the user's ID as key
 * @param: {object} currentConnections    object that stores connections, in an array for every user
 * @param: {object} user                  user object with name property
 * @param: {object} io                    io object
 * @param: {object} socket                socket object
 * @param: {string} namespace             used for logging
 */
function addSocket(currentConnections, user, io, socket) {
  if (currentConnections.hasOwnProperty(user.id)) {
    currentConnections[user.id].sockets.push(socket);
  } else {
    currentConnections[user.id] = {
      sockets: [socket],
      user: user
    };
    io.emit("user joined", user);
  }
}

module.exports = {
  removeSocket,
  addSocket
};
