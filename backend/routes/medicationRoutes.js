const express = require("express");
const {
  addMedication,
  getMedications,
  updateMedication,
  deleteMedication,
} = require("../controllers/medicationController");
const { authMiddleware } = require("../middleware/auth");

const router = express.Router();

// Apply auth middleware to all routes
router.use(authMiddleware);

// Medication endpoints
router.post("/", addMedication);
router.get("/:userId", getMedications);
router.put("/:id", updateMedication);
router.delete("/:id", deleteMedication);

module.exports = router;
