const { Configuration, OpenAIApi } = require("openai");

// Initialize OpenAI configuration
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

/**
 * Generate AI response for health-related questions
 * @param {string} message - User's health question
 * @returns {Promise<string>} - AI response text
 */
async function generateHealthResponse(message) {
  try {
    const completion = await openai.createCompletion({
      model: "gpt-3.5-turbo-instruct",
      prompt: `As a medical AI assistant, please respond to this health-related question: ${message}`,
      max_tokens: 500,
    });

    return completion.data.choices[0].text;
  } catch (error) {
    console.error("OpenAI API error:", error);
    throw new Error("Failed to generate AI response");
  }
}

/**
 * Analyze symptoms and provide possible conditions
 * @param {string[]} symptoms - Array of symptoms
 * @returns {Promise<string>} - Analysis result
 */
async function analyzeSymptoms(symptoms) {
  try {
    const prompt = `As a medical AI assistant, analyze these symptoms and provide a preliminary assessment: ${symptoms.join(
      ", "
    )}`;

    const completion = await openai.createCompletion({
      model: "gpt-3.5-turbo-instruct",
      prompt,
      max_tokens: 500,
    });

    return completion.data.choices[0].text;
  } catch (error) {
    console.error("OpenAI API error:", error);
    throw new Error("Failed to analyze symptoms");
  }
}

/**
 * Generate a nutrition plan based on preferences
 * @param {string[]} preferences - Dietary preferences
 * @param {number} caloriesTarget - Daily calorie target
 * @returns {Promise<string>} - Meal plan
 */
async function generateMealPlan(preferences, caloriesTarget) {
  try {
    const prompt = `Create a healthy meal plan considering these preferences: ${preferences.join(
      ", "
    )} with a daily calorie target of ${caloriesTarget}`;

    const completion = await openai.createCompletion({
      model: "gpt-3.5-turbo-instruct",
      prompt,
      max_tokens: 1000,
    });

    return completion.data.choices[0].text;
  } catch (error) {
    console.error("OpenAI API error:", error);
    throw new Error("Failed to generate meal plan");
  }
}

module.exports = {
  generateHealthResponse,
  analyzeSymptoms,
  generateMealPlan,
};
