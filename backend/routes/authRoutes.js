const express = require("express");
const {
  signUp,
  signIn,
  signOut,
  getProfile,
  updateProfile,
} = require("../controllers/authController");
const { authMiddleware } = require("../middleware/auth");

const router = express.Router();

// Public routes
router.post("/signup", signUp);
router.post("/signin", signIn);
router.post("/signout", signOut);

// Protected routes
router.get("/profile/:userId", authMiddleware, getProfile);
router.put("/profile/:userId", authMiddleware, updateProfile);

module.exports = router;
