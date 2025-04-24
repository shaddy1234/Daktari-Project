const { analyzeSymptoms } = require("../services/openaiService");

/**
 * Analyze user symptoms
 * @route POST /api/symptoms/analyze
 */
async function analyzeUserSymptoms(req, res, next) {
  try {
    const { symptoms, userId } = req.body;

    if (!symptoms || !symptoms.length || !userId) {
      return res.status(400).json({
        success: false,
        error: "Symptoms and userId are required",
      });
    }

    // Generate AI analysis
    const analysis = await analyzeSymptoms(symptoms);

    // Save to database
    const { data, error } = await req.supabase
      .from("symptoms")
      .insert({
        user_id: userId,
        symptoms,
        ai_analysis: { analysis },
      })
      .select();

    if (error) throw error;

    res.status(200).json({
      success: true,
      data: {
        symptoms,
        analysis,
        timestamp: new Date(),
      },
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Get user symptom history
 * @route GET /api/symptoms/history/:userId
 */
async function getSymptomHistory(req, res, next) {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        success: false,
        error: "User ID is required",
      });
    }

    const { data, error } = await req.supabase
      .from("symptoms")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) throw error;

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  analyzeUserSymptoms,
  getSymptomHistory,
};
