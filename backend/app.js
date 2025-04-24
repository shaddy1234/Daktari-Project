const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const { errorHandler } = require("./middleware/errorHandler");
const { attachSupabase } = require("./config/db");

// Route imports
const authRoutes = require("./routes/authRoutes");
const chatRoutes = require("./routes/chatRoutes");
const symptomRoutes = require("./routes/symptomRoutes");
const nutritionRoutes = require("./routes/nutritionRoutes");
const medicationRoutes = require("./routes/medicationRoutes");
const mentalHealthRoutes = require("./routes/mentalHealthRoutes");

const app = express();

// Middleware
app.use(helmet()); // Security headers
app.use(morgan("dev")); // Logging
app.use(cors()); // CORS handling
app.use(express.json()); // JSON body parsing
app.use(attachSupabase); // Attach Supabase client to each request

// Root route
app.get("/", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "Welcome to DoktaAI API",
    version: "1.0.0",
    documentation: "/api-docs",
    endpoints: {
      auth: "/api/auth",
      chat: "/api/chat",
      symptoms: "/api/symptoms",
      nutrition: "/api/nutrition",
      medications: "/api/medications",
      mentalHealth: "/api/mental-health",
    },
  });
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/symptoms", symptomRoutes);
app.use("/api/nutrition", nutritionRoutes);
app.use("/api/medications", medicationRoutes);
app.use("/api/mental-health", mentalHealthRoutes);

// Health check route
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// Error handling middleware
app.use(errorHandler);

module.exports = app;
