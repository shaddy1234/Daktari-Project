const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Get token from localStorage or state management
const getAuthHeader = () => {
  const token = localStorage.getItem("supabase.auth.token");
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
};

// Symptom checker service
export const analyzeSymptoms = async (symptoms, userId) => {
  try {
    const response = await fetch(`${API_URL}/symptoms/analyze`, {
      method: "POST",
      headers: getAuthHeader(),
      body: JSON.stringify({ symptoms, userId }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to analyze symptoms");
    }

    return await response.json();
  } catch (error) {
    console.error("Error analyzing symptoms:", error);
    throw error;
  }
};

// Nutrition planner service
export const generateMealPlan = async (preferences, caloriesTarget, userId) => {
  try {
    const response = await fetch(`${API_URL}/nutrition/plan`, {
      method: "POST",
      headers: getAuthHeader(),
      body: JSON.stringify({ preferences, caloriesTarget, userId }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to generate meal plan");
    }

    return await response.json();
  } catch (error) {
    console.error("Error generating meal plan:", error);
    throw error;
  }
};

// Chatbot service
export const sendChatMessage = async (message, userId) => {
  try {
    const response = await fetch(`${API_URL}/chat/message`, {
      method: "POST",
      headers: getAuthHeader(),
      body: JSON.stringify({ message, userId }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to get chatbot response");
    }

    return await response.json();
  } catch (error) {
    console.error("Error sending chat message:", error);
    throw error;
  }
};
