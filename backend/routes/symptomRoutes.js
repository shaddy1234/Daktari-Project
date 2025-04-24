const express = require("express");
const {
  analyzeUserSymptoms,
  getSymptomHistory,
} = require("../controllers/symptomController");
const { authMiddleware } = require("../middleware/auth");

const router = express.Router();

// Apply auth middleware to all routes
router.use(authMiddleware);

// Symptom endpoints
router.post("/analyze", analyzeUserSymptoms);
router.get("/history/:userId", getSymptomHistory);

module.exports = router;
