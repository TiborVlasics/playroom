const express = require("express");
const router = express.Router();
const Message = require("../../models/Message");

/**
 * @route   POST /chat
 * @desc    Register user
 * @access  Public
 * Returns all chat messages
 * TODO: Make it private
 */
router.get("/", (req, res) => {
  Message.find()
    .sort({ createdDate: 1 })
    .then(data => res.status(200).json(data))
    .catch(err => console.log(err));
});

module.exports = router;
