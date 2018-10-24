const express = require("express");
const router = express.Router();
const Message = require("../models/Message");
const passport = require("passport");

/**
 * @route   POST api/chat
 * @desc    Register user
 * @access  Private
 * Returns all chat messages
 */
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Message.find()
      .sort({ createdDate: 1 })
      .then(data => res.status(200).json(data))
      .catch(err => console.log(err));
  });

module.exports = router;
