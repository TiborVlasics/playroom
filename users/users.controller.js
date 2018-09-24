const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const validateRegisterInput = require("../validation/register");

const User = require("./user.model");

/**
 * @route   POST /users/register
 * @desc    Register user
 * @access  Public
 */
router.post("/register", register);

router.get("/", (req, res) => {
  res.json({ msg: "users works" });
});

function register(req, res) {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ name: req.body.name }).then(user => {
    if (user) {
      errors.name = "Name already in use";
      res.status(400).json(errors);
    } else {
      const newUser = new User({
        name: req.body.name,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
}

module.exports = router;
