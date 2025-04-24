const express = require("express");
const {
  createNutritionPlan,
  getNutritionPlans,
  getNutritionPlan,
} = require("../controllers/nutritionController");
const { authMiddleware } = require("../middleware/auth");

const router = express.Router();

// Apply auth middleware to all routes
router.use(authMiddleware);

// Nutrition endpoints
router.post("/plan", createNutritionPlan);
router.get("/plans/:userId", getNutritionPlans);
router.get("/plan/:id", getNutritionPlan);

module.exports = router;
