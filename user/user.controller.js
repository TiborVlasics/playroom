const express = require("express");
const router = express.Router();

const validateRegisterInput = require("../validation/register");

const userService = require("./user.service");

/**
 * @route   POST /users/register
 * @desc    Register user
 * @access  Public
 */
router.post("/register", register);

function register(req, res, next) {
  const { errors, isValid } = validateRegisterInput(req.body);
  if (!isValid) return res.status(400).json(errors);

  userService
    .create(req.body)
    .then(user => res.status(200).json(user))
    .catch(err => next(err));
}

module.exports = router;
