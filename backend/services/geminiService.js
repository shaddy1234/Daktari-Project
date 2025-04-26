// filepath: c:\Users\User\Desktop\Coding\projects\Daktari-Project\backend\services\geminiService.js
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Initialize Google Generative AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // Or another suitable model

/**
 * Helper function to generate content using Gemini
 * @param {string} prompt - The prompt to send to the model
 * @param {number} maxTokens - Maximum tokens for the response
 * @returns {Promise<string>} - Generated text response
 */
async function generateContent(prompt, maxTokens = 500) {
  try {
    const result = await model.generateContent(prompt, {
      maxOutputTokens: maxTokens,
    });
    const response = await result.response;
    const text = response.text();
    return text;
  } catch (error) {
    console.error("Gemini API error:", error);
    // Check for specific safety-related errors if needed
    if (error.message.includes("SAFETY")) {
      return "I cannot provide a response due to safety concerns regarding the prompt.";
    }
    throw new Error("Failed to generate AI response from Gemini");
  }
}

/**
 * Generate AI response for health-related questions
 * @param {string} message - User's health question
 * @returns {Promise<string>} - AI response text
 */
async function generateHealthResponse(message) {
  const prompt = `As a medical AI assistant, please respond to this health-related question: ${message}`;
  return await generateContent(prompt, 500);
}

/**
 * Analyze symptoms and provide possible conditions
 * @param {string[]} symptoms - Array of symptoms
 * @returns {Promise<string>} - Analysis result
 */
async function analyzeSymptoms(symptoms) {
  const prompt = `As a medical AI assistant, analyze these symptoms and provide a preliminary assessment: ${symptoms.join(
    ", "
  )}`;
  return await generateContent(prompt, 500);
}

/**
 * Generate a nutrition plan based on preferences
 * @param {string[]} preferences - Dietary preferences
 * @param {number} caloriesTarget - Daily calorie target
 * @returns {Promise<string>} - Meal plan
 */
async function generateMealPlan(preferences, caloriesTarget) {
  const prompt = `Create a healthy meal plan considering these preferences: ${preferences.join(
    ", "
  )} with a daily calorie target of ${caloriesTarget}`;
  return await generateContent(prompt, 1000);
}

module.exports = {
  generateHealthResponse,
  analyzeSymptoms,
  generateMealPlan,
};
