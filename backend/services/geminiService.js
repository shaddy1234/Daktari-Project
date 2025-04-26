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
async function generateHealthResponse(currentMessage, history = []) {
  let prompt = `You are DoktaAI, a helpful AI medical assistant.
Your primary goal is to provide informative and supportive health-related guidance.
**Important Rules:**
*   **DO NOT provide medical diagnoses.** Always state clearly that you cannot diagnose conditions.
*   **DO NOT provide specific treatment plans.** Suggest general wellness practices or advise consulting a doctor.
*   **ALWAYS recommend consulting a qualified healthcare professional (like a doctor or nurse practitioner) for any medical concerns, diagnosis, or treatment.**
*   Keep your responses concise, empathetic, and easy to understand.
*   Use the conversation history for context.

Conversation History (Oldest to Newest):`;

  if (history.length > 0) {
    history.forEach((turn) => {
      prompt += `\nUser: ${turn.message}`;
      prompt += `\nAI: ${turn.ai_response}`;
    });
  } else {
    prompt += "\n(No previous conversation history)";
  }

  prompt += `\n\nUser: ${currentMessage}`;
  prompt += `\nAI:`; // Ready for the AI's response

  console.log("Generated Prompt for Gemini:", prompt); // Log the prompt for debugging

  // Use a slightly higher token limit if including history
  return await generateContent(prompt, 700);
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
