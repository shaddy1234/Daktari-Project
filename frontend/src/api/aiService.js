const FUNCTIONS_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1`;

const headers = {
  'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
  'Content-Type': 'application/json',
};

// Symptom checker service
export const analyzeSymptoms = async (symptoms, userId) => {
  try {
    const response = await fetch(`${FUNCTIONS_URL}/symptom-checker`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ symptoms, userId }),
    });
    
    if (!response.ok) throw new Error('Failed to analyze symptoms');
    return await response.json();
  } catch (error) {
    console.error('Error analyzing symptoms:', error);
    throw error;
  }
};

// Nutrition planner service
export const generateMealPlan = async (preferences, caloriesTarget, userId) => {
  try {
    const response = await fetch(`${FUNCTIONS_URL}/nutrition-planner`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ preferences, caloriesTarget, userId }),
    });
    
    if (!response.ok) throw new Error('Failed to generate meal plan');
    return await response.json();
  } catch (error) {
    console.error('Error generating meal plan:', error);
    throw error;
  }
};

// Chatbot service
export const sendChatMessage = async (message, userId) => {
  try {
    const response = await fetch(`${FUNCTIONS_URL}/chatbot`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ message, userId }),
    });
    
    if (!response.ok) throw new Error('Failed to get chatbot response');
    return await response.json();
  } catch (error) {
    console.error('Error sending chat message:', error);
    throw error;
  }
};