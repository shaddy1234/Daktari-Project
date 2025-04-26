const path = require("path");
const crypto = require("crypto");
const { generateHealthResponse } = require("../services/geminiService");
const storageService = require("../services/storageService"); // Use storage service

// Define the path to the JSON storage file for chat history
const CHAT_DATA_FILE_PATH = path.join(
  __dirname,
  "..",
  "data",
  "chatHistory.json"
);
const MAX_HISTORY_TURNS = 5; // Number of recent conversation turns to send to AI

/**
 * Send a message to the AI assistant and store interaction
 * @route POST /api/chat/message
 */
async function sendMessage(req, res, next) {
  console.log("Received request to send chat message:", req.body);
  try {
    const { message, userId: userIdFromBody } = req.body;
    const authenticatedUserId = req.user.id; // User ID from verified token

    if (!message || !userIdFromBody) {
      console.warn("Missing message or userId in request body");
      return res.status(400).json({
        success: false,
        error: "Message and userId are required",
      });
    }

    // Security Check: Validate user ID match
    console.log("Authenticated user ID:", authenticatedUserId);
    console.log("User ID from request body:", userIdFromBody);
    if (userIdFromBody !== authenticatedUserId) {
      console.warn(
        `Forbidden: Attempt to send message for user ${userIdFromBody} by authenticated user ${authenticatedUserId}`
      );
      return res.status(403).json({
        success: false,
        error: "Forbidden: User ID mismatch",
      });
    }

    // --- Load history using storageService ---
    console.log("Reading chat history using storageService...");
    const allChats = await storageService.readData(CHAT_DATA_FILE_PATH);
    // Ensure it's an array
    const validChats = Array.isArray(allChats) ? allChats : [];

    const userChatHistory = validChats
      .filter((chat) => chat.user_id === authenticatedUserId)
      .sort((a, b) => new Date(a.created_at) - new Date(b.created_at)); // Sort oldest to newest

    // Prepare recent history for AI context (last N turns)
    const recentHistory = userChatHistory.slice(-MAX_HISTORY_TURNS);

    // --- Generate AI response with history ---
    console.log("Calling Gemini service with message and history...");
    const aiResponse = await generateHealthResponse(message, recentHistory); // Pass history
    console.log("Gemini response received.");

    // --- Save interaction using storageService ---
    const newChatRecord = {
      id: crypto.randomUUID(),
      user_id: authenticatedUserId,
      message: message, // User's message
      ai_response: aiResponse, // AI's response
      created_at: new Date().toISOString(),
    };

    validChats.push(newChatRecord); // Add new record to the full list
    console.log("Saving updated chat history using storageService...");
    await storageService.writeData(CHAT_DATA_FILE_PATH, validChats);
    console.log("Chat interaction saved successfully:", newChatRecord.id);
    // --- End storageService save ---

    res.status(200).json({
      success: true,
      data: {
        message: newChatRecord.message,
        aiResponse: newChatRecord.ai_response,
        id: newChatRecord.id,
        timestamp: newChatRecord.created_at,
      },
    });
  } catch (error) {
    console.error(
      "Error in sendMessage controller:",
      error.message || JSON.stringify(error)
    );
    next(
      error instanceof Error
        ? error
        : new Error("Failed to process chat message due to an internal error.")
    );
  }
}

/**
 * Get user's chat history from JSON file
 * @route GET /api/chat/history/:userId
 */
async function getChatHistoryHandler(req, res, next) {
  try {
    const { userId } = req.params;
    const authenticatedUserId = req.user.id;

    if (!userId) {
      return res.status(400).json({
        success: false,
        error: "User ID is required",
      });
    }

    // Security Check: Ensure the authenticated user matches the requested userId
    if (userId !== authenticatedUserId) {
      console.warn(
        `Forbidden: Attempt to get chat history for user ${userId} by authenticated user ${authenticatedUserId}`
      );
      return res.status(403).json({
        success: false,
        error: "Forbidden: Cannot access another user's chat history",
      });
    }

    // --- Get using storageService ---
    console.log(
      `Fetching chat history for user ${userId} using storageService...`
    );
    const allChats = await storageService.readData(CHAT_DATA_FILE_PATH);
    const validChats = Array.isArray(allChats) ? allChats : [];

    const userHistory = validChats
      .filter((record) => record.user_id === userId)
      .sort((a, b) => new Date(a.created_at) - new Date(b.created_at)); // Sort oldest to newest

    console.log(
      `Found ${userHistory.length} chat records for user ${userId} via storageService.`
    );
    // --- End get using storageService ---

    res.status(200).json({
      success: true,
      // Return history formatted for the frontend if needed, or raw records
      data: userHistory
        .map((record) => ({
          text: record.message,
          isBot: false,
          timestamp: record.created_at, // Include timestamp if needed
        }))
        .concat(
          userHistory.map((record) => ({
            // This might need adjustment based on how frontend expects history
            text: record.ai_response,
            isBot: true,
            timestamp: record.created_at,
          }))
        )
        .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp)), // Ensure final sort
    });
  } catch (error) {
    console.error(
      "Error in getChatHistoryHandler controller:",
      error.message || JSON.stringify(error)
    );
    next(
      error instanceof Error
        ? error
        : new Error("Failed to retrieve chat history due to an internal error.")
    );
  }
}

module.exports = {
  sendMessage,
  getChatHistoryHandler,
};
