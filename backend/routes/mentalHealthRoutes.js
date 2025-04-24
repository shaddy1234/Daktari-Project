const express = require("express");
const {
  addAssessment,
  getAssessmentHistory,
  getMentalHealthSummary,
} = require("../controllers/mentalHealthController");
const { authMiddleware } = require("../middleware/auth");

const router = express.Router();

// Apply auth middleware to all routes
router.use(authMiddleware);

// Mental health endpoints
router.post("/assessment", addAssessment);
router.get("/history/:userId", getAssessmentHistory);
router.get("/summary/:userId", getMentalHealthSummary);

module.exports = router;
