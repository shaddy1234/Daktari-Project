const express = require("express");
const {
  sendMessage,
  getChatHistoryHandler,
  clearChatHistoryHandler, // Import the new handler
} = require("../controllers/chatController");
const { authMiddleware } = require("../middleware/auth"); // Use the correct middleware name

const router = express.Router();

// Apply auth middleware to all chat routes
router.use(authMiddleware);

// Chat endpoints
router.post("/message", sendMessage);
router.get("/history/:userId", getChatHistoryHandler);
router.delete("/history/:userId", clearChatHistoryHandler); // Add DELETE route

module.exports = router;
