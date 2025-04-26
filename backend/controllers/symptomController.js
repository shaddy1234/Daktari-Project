const { analyzeSymptoms } = require("../services/geminiService");

// In-memory store for symptom analyses (Data lost on server restart)
let symptomAnalysesStore = [];
let nextAnalysisId = 1; // Simple ID generator

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

    // --- Store in-memory ---
    console.log("Saving analysis to in-memory JSON store...");
    const newAnalysisRecord = {
      id: nextAnalysisId++, // Assign a simple ID
      user_id: authenticatedUserId,
      symptoms,
      ai_analysis: { analysis }, // Keep structure similar
      created_at: new Date().toISOString(), // Add timestamp
    };
    symptomAnalysesStore.push(newAnalysisRecord);
    console.log("Analysis saved successfully to memory:", newAnalysisRecord);
    // --- End in-memory store ---

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
      JSON.stringify(error, Object.getOwnPropertyNames(error), 2)
    );
    // Send the generic error message to the client
    next(new Error("Failed to analyze symptoms due to an internal error."));
  }
}

/**
 * Get user symptom history
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

    // Optional: Keep check for logging or if you re-introduce client-side filtering later
    if (userId !== authenticatedUserId) {
      console.warn(
        `Attempt to get history for user ${userId} by authenticated user ${authenticatedUserId}`
      );
      // Note: With RLS disabled, this check doesn't prevent access, but logs the attempt.
      // You could return 403 here if you still want API-level authorization.
      // return res.status(403).json({
      //   success: false,
      //   error: "Forbidden: Cannot access another user's history",
      // });
    }

    // --- Get from database using SERVICE ROLE client ---
    console.log(
      `Fetching symptom history for user ${userId} using service role client...`
    );
    const { data, error } = await req.supabase // Use req.supabase (service role)
      .from("symptoms")
      .select("*")
      .eq("user_id", userId) // Filter by user_id still needed
      .order("created_at", { ascending: false });

    if (error) {
      console.error(
        "Supabase select error (using service role):",
        JSON.stringify(error, null, 2)
      );
      throw error;
    }

    console.log(`Found ${data.length} symptom records for user ${userId}.`);
    // --- End get from database ---

    res.status(200).json({
      success: true,
      data, // Return the filtered and sorted array
    });
  } catch (error) {
    console.error(
      "Error in getSymptomHistory controller:",
      JSON.stringify(error, Object.getOwnPropertyNames(error), 2)
    );
    next(
      new Error("Failed to retrieve symptom history due to an internal error.")
    );
  }
}

module.exports = {
  analyzeUserSymptoms,
  getSymptomHistory,
};
