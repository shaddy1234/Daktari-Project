const { generateMealPlan } = require("../services/openaiService");

/**
 * Generate a nutrition plan
 * @route POST /api/nutrition/plan
 */
async function createNutritionPlan(req, res, next) {
  try {
    const { preferences, caloriesTarget, userId } = req.body;

    if (!preferences || !preferences.length || !caloriesTarget || !userId) {
      return res.status(400).json({
        success: false,
        error: "Preferences, calorie target, and userId are required",
      });
    }

    // Generate meal plan using OpenAI
    const mealPlan = await generateMealPlan(preferences, caloriesTarget);

    // Save to database
    const { data, error } = await req.supabase
      .from("nutrition_plans")
      .insert({
        user_id: userId,
        dietary_preferences: preferences,
        meal_plan: { plan: mealPlan },
        calories_target: caloriesTarget,
      })
      .select();

    if (error) throw error;

    res.status(201).json({
      success: true,
      data: {
        preferences,
        caloriesTarget,
        mealPlan,
        id: data[0].id,
        timestamp: new Date(),
      },
    });
  } catch (error) {
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
