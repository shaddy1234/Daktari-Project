const path = require("path");
const crypto = require("crypto"); // For generating unique IDs
const { analyzeSymptoms } = require("../services/geminiService");
const storageService = require("../services/storageService"); // Import the new service

// Define the path to the JSON storage file for symptoms
const DATA_FILE_PATH = path.join(
  __dirname,
  "..",
  "data",
  "symptomAnalyses.json"
);

// --- Removed readAnalysesFromFile and writeAnalysesToFile helper functions ---
// They are now handled by storageService

/**
 * Analyze user symptoms
 * @route POST /api/symptoms/analyze
 */
async function analyzeUserSymptoms(req, res, next) {
  console.log("Received request to analyze symptoms:", req.body);

  try {
    const { symptoms, userId: userIdFromBody } = req.body;
    const authenticatedUserId = req.user.id; // User ID from verified token

    if (!symptoms || !symptoms.length || !userIdFromBody) {
      console.warn("Missing symptoms or userId in request body");
      return res.status(400).json({
        success: false,
        error: "Symptoms and userId are required",
      });
    }

    // Security Check: Still validate user ID match
    console.log("Authenticated user ID:", authenticatedUserId);
    console.log("User ID from request body:", userIdFromBody);
    if (userIdFromBody !== authenticatedUserId) {
      console.warn(
        `Forbidden: Attempt to analyze symptoms for user ${userIdFromBody} by authenticated user ${authenticatedUserId}`
      );
      return res.status(403).json({
        success: false,
        error: "Forbidden: User ID mismatch",
      });
    }

    // Generate AI analysis
    console.log("Calling Gemini service to analyze symptoms...");
    const analysis = await analyzeSymptoms(symptoms);
    console.log("Gemini analysis received.");

    // --- Store using storageService ---
    console.log("Reading existing analyses using storageService...");
    // Read data specifically from the symptom analyses file
    const allAnalyses = await storageService.readData(DATA_FILE_PATH);

    console.log("Saving analysis using storageService...");
    const newAnalysisRecord = {
      id: crypto.randomUUID(), // Generate a unique ID
      user_id: authenticatedUserId,
      symptoms,
      ai_analysis: { analysis }, // Keep structure similar
      created_at: new Date().toISOString(), // Add timestamp
    };

    // Ensure allAnalyses is an array before pushing
    if (!Array.isArray(allAnalyses)) {
      console.error(
        "Data read from file is not an array. Resetting to empty array."
      );
      allAnalyses = []; // Or handle this error more robustly depending on requirements
    }

    allAnalyses.push(newAnalysisRecord);
    // Write data specifically to the symptom analyses file
    await storageService.writeData(DATA_FILE_PATH, allAnalyses);
    console.log(
      "Analysis saved successfully via storageService:",
      newAnalysisRecord
    );
    // --- End storageService store ---

    res.status(200).json({
      success: true,
      data: {
        symptoms: newAnalysisRecord.symptoms,
        analysis: newAnalysisRecord.ai_analysis.analysis, // Extract analysis text
        id: newAnalysisRecord.id, // Return the generated ID
        timestamp: newAnalysisRecord.created_at,
      },
    });
  } catch (error) {
    console.error(
      "Error in analyzeUserSymptoms controller:",
      // Avoid stringifying the whole error object if it might contain circular references
      error.message || JSON.stringify(error)
    );
    next(
      error instanceof Error
        ? error
        : new Error("Failed to analyze symptoms due to an internal error.")
    );
  }
}

/**
 * Get user symptom history from JSON file
 * @route GET /api/symptoms/history/:userId
 */
async function getSymptomHistory(req, res, next) {
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
        `Forbidden: Attempt to get history for user ${userId} by authenticated user ${authenticatedUserId}`
      );
      return res.status(403).json({
        success: false,
        error: "Forbidden: Cannot access another user's history",
      });
    }

    // --- Get using storageService ---
    console.log(
      `Fetching symptom history for user ${userId} using storageService...`
    );
    // Read data specifically from the symptom analyses file
    const allAnalyses = await storageService.readData(DATA_FILE_PATH);

    // Ensure allAnalyses is an array before filtering
    if (!Array.isArray(allAnalyses)) {
      console.error(
        "Data read from file is not an array for history retrieval."
      );
      // Depending on desired behavior, return empty or throw error
      return res.status(200).json({ success: true, data: [] });
    }

    const userHistory = allAnalyses
      .filter((record) => record.user_id === userId)
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at)); // Sort descending by date

    console.log(
      `Found ${userHistory.length} symptom records for user ${userId} via storageService.`
    );
    // --- End get using storageService ---

    res.status(200).json({
      success: true,
      data: userHistory, // Return the filtered and sorted array
    });
  } catch (error) {
    console.error(
      "Error in getSymptomHistory controller:",
      error.message || JSON.stringify(error)
    );
    next(
      error instanceof Error
        ? error
        : new Error(
            "Failed to retrieve symptom history due to an internal error."
          )
    );
  }
}

module.exports = {
  analyzeUserSymptoms,
  getSymptomHistory,
};
