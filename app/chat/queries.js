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

function addTextToLastMessage(latestMessage, message) {
  return Message.findOneAndUpdate(
    { _id: latestMessage._id },
    {
      $set: {
        text: [...latestMessage.text, message.text],
        createdDate: Date.now()
      }
    },
    { new: true }
  );
}

module.exports = { createNewMessage, addTextToLastMessage };
