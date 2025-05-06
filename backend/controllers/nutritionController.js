const { generateMealPlan } = require("../services/geminiService");

async function createNutritionPlan(req, res, next) {
  try {
    const { preferences, caloriesTarget } = req.body;
    const userId = req.user.id;

    if (!Array.isArray(preferences) || preferences.length === 0) {
      return res.status(400).json({
        success: false,
        error: "Preferences must be a non-empty array",
      });
    }
    if (!caloriesTarget || isNaN(caloriesTarget)) {
      return res.status(400).json({
        success: false,
        error: "Valid caloriesTarget is required",
      });
    }

    const mealPlan = await generateMealPlan(preferences, caloriesTarget);

    // Save to database (wrap in an array)
    const { data, error: dbError } = await req.supabase
      .from("nutrition_plans")
      .insert([
        {
          user_id: userId,
          dietary_preferences: preferences,
          meal_plan: { plan: mealPlan },
          calories_target: caloriesTarget,
        },
      ])
      .select();

    if (dbError) {
      console.error("Database error inserting nutrition plan:", dbError);
      return res.status(500).json({
        success: false,
        error: dbError.message || "Failed to save nutrition plan",
      });
    }

    res.status(201).json({
      success: true,
      data: {
        ...data[0],
        mealPlan,
      },
    });
  } catch (error) {
    console.error("Error creating nutrition plan:", error);
    next(error);
  }
}

/**
 * Get user's nutrition plans
 * @route GET /api/nutrition/plans/:userId
 */
async function getNutritionPlans(req, res, next) {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        success: false,
        error: "User ID is required",
      });
    }

    const { data, error } = await req.supabase
      .from("nutrition_plans")
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
 * Get specific nutrition plan
 * @route GET /api/nutrition/plan/:id
 */
async function getNutritionPlan(req, res, next) {
  try {
    const { id } = req.params;

    const { data, error } = await req.supabase
      .from("nutrition_plans")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;

    // Check user authorization
    if (data.user_id !== req.user.id) {
      return res.status(403).json({
        success: false,
        error: "Unauthorized to access this nutrition plan",
      });
    }

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createNutritionPlan,
  getNutritionPlans,
  getNutritionPlan,
};
