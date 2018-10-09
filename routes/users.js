const express = require("express");
const router = express.Router();

const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

const userService = require("../services/userService");

/**
 * @route   POST /user/register
 * @desc    Register user
 * @access  Public
 */
router.post("/register", (req, res, next) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  if (!isValid) return res.status(400).json(errors);

  userService
    .create(req.body)
    .then(user => res.status(200).json(user))
    .catch(err => {
      errors.name = err;
      res.status(400).json(errors);
    });
});

/**
 * @route   GET api/user/login
 * @desc    Login user / returning token
 * @access  Public
 */
router.post("/login", (req, res, next) => {
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) return res.status(400).json(errors);

  userService
    .authenticate(req.body)
    .then(user => res.status(200).json(user))
    .catch(err => {
      errors.name = "Name or password is incorrect";
      res.status(400).json(errors);
    });
});

module.exports = router;
