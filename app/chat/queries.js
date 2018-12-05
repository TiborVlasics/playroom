const Message = require("./Message");

function createNewMessage(message) {
  return new Message({
    author: {
      id: message.author.id,
      name: message.author.name
    },
    text: [message.text],
    thumbnail: message.author.avatar
  }).save();
}

function addTextToLastMessage(lastMsg, message) {
  return Message.findOneAndUpdate(
    { _id: lastMsg._id },
    {
      $set: {
        text: [...lastMsg.text, message.text],
        createdDate: Date.now()
      }
    },
    { new: true }
  );
}

module.exports = { createNewMessage, addTextToLastMessage };
