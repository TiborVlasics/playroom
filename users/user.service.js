const bcrypt = require("bcryptjs");
const User = require("./user.model");

module.exports = {
  create
};

async function create(user) {
  if (await User.findOne({ name: user.name })) {
    throw "Username already exists.";
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(user.password, salt);

  const newUser = new User({
    name: user.name,
    password: hash
  });

  return newUser.save();
}
