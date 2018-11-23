const express = require("express");
const router = express.Router();
const Message = require("./Message");
const passport = require("passport");

/**
 * @route   POST api/chat/:skip
 * @desc    Get all chat messages ordered by creation date
 * @access  Private
 */
router.get(
  "/:skip",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const toSkip = Number(req.params.skip);

    Message.find()
      .sort({ createdDate: -1 })
      .skip(toSkip)
      .limit(5)
      .then(messages => {
        messages.reverse();
        res.status(200).json(messages);
      })
      .catch(err => console.log(err));
  }
);

module.exports = router;
