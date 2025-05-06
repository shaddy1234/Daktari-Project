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

async function analyzeSymptoms(symptoms) {
  const prompt = `As a medical AI assistant, analyze these symptoms and provide a preliminary assessment: ${symptoms.join(
    ", "
  )}`;
  return await generateContent(prompt, 500);
}

async function generateMealPlan(preferences, caloriesTarget) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Create a detailed meal plan considering these dietary preferences: ${preferences.join(
      ", "
    )} with a daily calorie target of ${caloriesTarget} calories. Include breakfast, lunch, dinner, and snacks with approximate calorie counts. Format the response in markdown.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    // ← await the text() call here
    const text = await response.text();

    return text;
  } catch (error) {
    console.error("Error generating meal plan:", error);
    throw new Error("Failed to generate meal plan");
  }
}

/**
 * Analyze mental state based on user input
 * @param {object} assessmentData - Object containing moodRating, symptoms, notes
 * @param {number} assessmentData.moodRating - User's mood rating (1-10)
 * @param {string[]} assessmentData.symptoms - Array of user-reported symptoms
 * @param {string} assessmentData.notes - Additional notes from the user
 * @returns {Promise<string>} - AI analysis and suggestions
 */
async function analyzeMentalState(assessmentData) {
  const { moodRating, symptoms, notes } = assessmentData;

  // Construct a detailed prompt for the AI
  const prompt = `
    Analyze the following mental health check-in information and provide supportive feedback and general suggestions.
    DO NOT provide a diagnosis or medical advice.

    User Input:
    - Mood Rating (1-10, higher is better): ${moodRating}
    - Reported Symptoms: ${
      symptoms.length > 0 ? symptoms.join(", ") : "None reported"
    }
    - Additional Notes: ${notes || "None provided"}

    Based on this input:
    1. Acknowledge the user's reported mood and symptoms in a supportive tone.
    2. Offer 2-3 general, evidence-based coping strategies or wellness tips relevant to the input (e.g., mindfulness, exercise, social connection, journaling). Keep suggestions brief.
    3. Include a clear and prominent disclaimer stating that you are an AI assistant, this is not a medical diagnosis or therapy, and the user should consult a qualified healthcare professional or therapist for any mental health concerns.

    Example Disclaimer: "**Disclaimer:** I am an AI assistant. This information is for general awareness and support only, not a substitute for professional medical advice, diagnosis, or treatment. Please consult a qualified healthcare provider or mental health professional for any health concerns."
  `;

  // Use a higher max token count if needed for more detailed suggestions
  return await generateContent(prompt, 700);
}

module.exports = {
  generateHealthResponse,
  analyzeSymptoms,
  generateMealPlan,
  analyzeMentalState,
};
