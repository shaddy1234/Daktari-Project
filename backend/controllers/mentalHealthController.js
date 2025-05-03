const { analyzeMentalState } = require("../services/geminiService");

/**
 * Add mental health assessment
 * @route POST /api/mental-health/assessment
 */
async function addAssessment(req, res, next) {
  try {
    const { userId, moodRating, symptoms, notes } = req.body;

    if (!userId || !moodRating) {
      return res.status(400).json({
        success: false,
        error: "User ID and mood rating are required",
      });
    }

    // Ensure user can only add their own assessment
    if (userId !== req.user.id) {
      return res.status(403).json({
        success: false,
        error: "Unauthorized to add assessment for this user",
      });
    }

    const { data, error } = await req.supabase
      .from("mental_health_assessments")
      .insert({
        user_id: userId,
        mood_rating: moodRating,
        symptoms: symptoms || [],
        notes,
      })
      .select();

    if (error) throw error;

    res.status(201).json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Analyze mental health assessment data using AI
 * @route POST /api/mental-health/analyze
 */
async function analyzeMentalHealthAssessment(req, res, next) {
  try {
    const { userId, moodRating, symptoms, notes } = req.body;
    const authenticatedUserId = req.user.id;

    if (!userId || moodRating === undefined) {
      // Check moodRating presence
      return res.status(400).json({
        success: false,
        error: "User ID and mood rating are required for analysis",
      });
    }
    if (!Array.isArray(symptoms)) {
      return res.status(400).json({
        success: false,
        error: "Symptoms must be provided as an array.",
      });
    }

    // Security Check: Ensure user ID matches authenticated user
    if (userId !== authenticatedUserId) {
      return res.status(403).json({
        success: false,
        error: "Forbidden: User ID mismatch",
      });
    }

    // Prepare data for AI service
    const assessmentDataForAI = {
      moodRating,
      symptoms,
      notes,
    };
    // Call the AI service function (replace with your actual implementation)
    // This function MUST include disclaimers about not being a diagnosis
    // and recommending professional help.
    const analysisResult = await analyzeMentalState(assessmentDataForAI);

    // Optionally: Save the analysis result linked to the assessment
    // This would require modifying the addAssessment logic or adding another DB call here.
    // For now, just return the analysis like the symptom checker.

    res.status(200).json({
      success: true,
      data: {
        analysis: analysisResult, // Assuming analyzeMentalState returns the analysis string
      },
    });
  } catch (error) {
    console.error("Error in analyzeMentalHealthAssessment:", error);
    next(error); // Pass error to the central error handler
  }
}

/**
 * Get mental health assessments for a user
 * @route GET /api/mental-health/history/:userId
 */
async function getAssessmentHistory(req, res, next) {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        success: false,
        error: "User ID is required",
      });
    }

    // Ensure user can only view their own assessments
    if (userId !== req.user.id) {
      return res.status(403).json({
        success: false,
        error: "Unauthorized to view assessments for this user",
      });
    }

    const { data, error } = await req.supabase
      .from("mental_health_assessments")
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

/**
 * Get mental health summary and trends
 * @route GET /api/mental-health/summary/:userId
 */
async function getMentalHealthSummary(req, res, next) {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        success: false,
        error: "User ID is required",
      });
    }

    // Ensure user can only view their own summary
    if (userId !== req.user.id) {
      return res.status(403).json({
        success: false,
        error: "Unauthorized to view summary for this user",
      });
    }

    // Get last 30 days of assessments
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const { data, error } = await req.supabase
      .from("mental_health_assessments")
      .select("*")
      .eq("user_id", userId)
      .gte("created_at", thirtyDaysAgo.toISOString())
      .order("created_at", { ascending: true });

    if (error) throw error;

    // Calculate summary statistics
    const summary = {
      assessmentCount: data.length,
      averageMood:
        data.length > 0
          ? data.reduce((sum, item) => sum + item.mood_rating, 0) / data.length
          : 0,
      moodTrend: data.map((item) => ({
        date: item.created_at,
        rating: item.mood_rating,
      })),
      commonSymptoms: getCommonSymptoms(data),
    };

    res.status(200).json({
      success: true,
      data: summary,
    });
  } catch (error) {
    next(error);
  }
}

// Helper function to find common symptoms
function getCommonSymptoms(assessments) {
  const symptomCounts = {};

  assessments.forEach((assessment) => {
    if (assessment.symptoms && assessment.symptoms.length) {
      assessment.symptoms.forEach((symptom) => {
        if (symptomCounts[symptom]) {
          symptomCounts[symptom]++;
        } else {
          symptomCounts[symptom] = 1;
        }
      });
    }
  });

  return Object.entries(symptomCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([symptom, count]) => ({ symptom, count }));
}

module.exports = {
  addAssessment,
  analyzeMentalHealthAssessment,
  getAssessmentHistory,
  getMentalHealthSummary,
};
