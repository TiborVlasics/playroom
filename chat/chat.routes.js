const express = require("express");
const router = express.Router();
const Message = require("./Message");
const passport = require("passport");

/**
 * @route   POST api/chat
 * @desc    Get all chat messages ordered by creation date
 * @access  Private
 */
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Message.find()
      .sort({ createdDate: 1 })
      .then(data => res.status(200).json(data))
      .catch(err => console.log(err));
  }
);

module.exports = router;
