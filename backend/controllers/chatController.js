const { generateHealthResponse } = require("../services/openaiService");
const {
  saveChatInteraction,
  getChatHistory,
} = require("../services/supabaseService");

/**
 * Send a message to the AI assistant
 * @route POST /api/chat/message
 */
async function sendMessage(req, res, next) {
  try {
    const { message, userId } = req.body;

    if (!message || !userId) {
      return res.status(400).json({
        success: false,
        error: "Message and userId are required",
      });
    }

    // Generate AI response
    const aiResponse = await generateHealthResponse(message);

    // Save to database
    const data = await saveChatInteraction(userId, message, aiResponse);

    res.status(200).json({
      success: true,
      data: {
        message,
        aiResponse,
        timestamp: new Date(),
      },
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Get user's chat history
 * @route GET /api/chat/history/:userId
 */
async function getChatHistoryHandler(req, res, next) {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        success: false,
        error: "User ID is required",
      });
    }

    const history = await getChatHistory(userId);

    res.status(200).json({
      success: true,
      data: history,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  sendMessage,
  getChatHistoryHandler,
};
