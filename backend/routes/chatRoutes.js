const express = require("express");
const {
  sendMessage,
  getChatHistoryHandler,
} = require("../controllers/chatController");
const { authMiddleware } = require("../middleware/auth");

const router = express.Router();

// Apply auth middleware to all chat routes
router.use(authMiddleware);

// Chat endpoints
router.post("/message", sendMessage);
router.get("/history/:userId", getChatHistoryHandler);

module.exports = router;
