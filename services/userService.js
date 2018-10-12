const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
  create,
  authenticate
};

async function create(user) {
  if (await User.findOne({ name: user.name })) throw "Username already exists.";
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(user.password, salt);
  const newUser = new User({
    name: user.name,
    password: hash,
    avatar: user.avatar
  });

  return newUser.save();
}

async function authenticate(userData) {
  const name = userData.name;
  const password = userData.password;

  user = await User.findOne({ name: name });

  if (!user) throw "User not found";

  const isMatch = await bcrypt.compare(password, user.password);
  if (isMatch) {
    const payload = {
      id: user.id,
      name: user.name,
      avatar: user.avatar
    };
    const token = await jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: "365d"
    });

    return {
      ...payload,
      success: true,
      token: "Bearer " + token
    };
  } else {
    throw "Password is incorrect";
  }
}
