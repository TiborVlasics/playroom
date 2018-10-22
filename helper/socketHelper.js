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
function deleteSocketFromConnections(currentConnections, user, io, socket, nameSpace) {
  if (currentConnections[user.id].sockets.length === 1) {
    delete currentConnections[user.id];
    io.emit("user left", user);
    console.log(`${user.name} disconnected from ${nameSpace}`);
  }
  else {
    currentConnections[user.id].sockets = currentConnections[user.id].sockets
      .filter(client => client.id !== socket.id);
  }
}

/**
* @desc Checks if currentConnections contains the connected users
* if it does, then puts it to next to as a different session,
* if it doesn't then makes a new property with the key of the user's ID 
* @param: {object} currentConnections    object that stores connections, in an array for every user
* @param: {object} user                  user object with name property
* @param: {object} io                    io object
* @param: {object} socket                socket object 
* @param: {string} namespace             used for logging
*/
function addSocketToConnections(currentConnections, user, io, socket, nameSpace) {
  if (currentConnections.hasOwnProperty(user.id)) {
    currentConnections[user.id].sockets.push(socket);
  }
  else {
    currentConnections[user.id] = {
      sockets: [socket],
      user: user
    };
    io.emit("user joined", user);
    console.log(`${user.name} connected to ${nameSpace}`);
  }
}

module.exports = {
  deleteSocketFromConnections,
  addSocketToConnections
}