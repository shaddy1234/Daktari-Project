const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Get authentication token from local storage
const getAuthToken = () => {
  const sessionData = localStorage.getItem("supabase.auth.token"); // Get raw string
  // console.log("SessionData:", sessionData);
  if (!sessionData) {
    return ""; // Return empty if nothing in localStorage
  }
  try {
    const session = JSON.parse(sessionData); // Parse the JSON string
    return session?.session?.access_token || ""; // Get access_token, return "" if missing or parsing failed implicitly before
  } catch (e) {
    console.error("Failed to parse auth token from localStorage:", e);
    // Optional: Clear the corrupted token to prevent future errors
    clearAuthToken();
    return ""; // Return empty on parse error
  }
};

// Set authentication token in local storage
const setAuthToken = (session) => {
  localStorage.setItem("supabase.auth.token", JSON.stringify(session));
};

// Clear authentication token from local storage
const clearAuthToken = () => {
  localStorage.removeItem("supabase.auth.token");
};

// Standard headers for authenticated requests
const getAuthHeaders = () => {
  const token = getAuthToken(); // Get the potentially parsed token
  // console.log("Token used for header:", token); // Add this log
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
};

// API request wrapper with error handling
async function apiRequest(endpoint, options = {}) {
  const url = `${API_URL}${endpoint}`;

  // Add auth headers to authenticated requests
  if (options.authenticated !== false) {
    options.headers = {
      ...getAuthHeaders(),
      ...(options.headers || {}),
    };
  }

  try {
    const response = await fetch(url, options);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Something went wrong");
    }

    return data;
  } catch (error) {
    console.error(`API Error (${endpoint}):`, error);
    throw error;
  }
}

// Auth endpoints
const auth = {
  signUp: async (email, password) => {
    const response = await apiRequest("/auth/signup", {
      method: "POST",
      authenticated: false,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (response.success && response.data) {
      setAuthToken(response.data);
    }

    return response;
  },

  signIn: async (email, password) => {
    const response = await apiRequest("/auth/signin", {
      method: "POST",
      authenticated: false,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (response.success && response.data) {
      setAuthToken(response.data);
    }

    return response;
  },

  signOut: async () => {
    const response = await apiRequest("/auth/signout", {
      method: "POST",
    });

    if (response.success) {
      clearAuthToken();
    }

    return response;
  },

  getProfile: async (userId) => {
    return await apiRequest(`/auth/profile/${userId}`);
  },

  updateProfile: async (userId, updates) => {
    return await apiRequest(`/auth/profile/${userId}`, {
      method: "PUT",
      body: JSON.stringify(updates),
    });
  },
};

// Symptom endpoints
const symptoms = {
  analyze: async (symptoms, userId) => {
    return await apiRequest("/symptoms/analyze", {
      method: "POST",
      body: JSON.stringify({ symptoms, userId }),
    });
  },

  getHistory: async (userId) => {
    return await apiRequest(`/symptoms/history/${userId}`);
  },
};

// Chat endpoints
const chat = {
  sendMessage: async (message, userId) => {
    return await apiRequest("/chat/message", {
      method: "POST",
      body: JSON.stringify({ message, userId }),
    });
  },

  getHistory: async (userId) => {
    return await apiRequest(`/chat/history/${userId}`);
  },
};

// Nutrition endpoints
const nutrition = {
  createPlan: async (preferences, caloriesTarget, userId) => {
    return await apiRequest("/nutrition/plan", {
      method: "POST",
      body: JSON.stringify({ preferences, caloriesTarget, userId }),
    });
  },

  getPlans: async (userId) => {
    return await apiRequest(`/nutrition/plans/${userId}`);
  },

  getPlan: async (id) => {
    return await apiRequest(`/nutrition/plan/${id}`);
  },
};

// Medication endpoints
const medications = {
  add: async (medicationData) => {
    return await apiRequest("/medications", {
      method: "POST",
      body: JSON.stringify(medicationData),
    });
  },

  get: async (userId) => {
    return await apiRequest(`/medications/${userId}`);
  },

  update: async (id, updates) => {
    return await apiRequest(`/medications/${id}`, {
      method: "PUT",
      body: JSON.stringify(updates),
    });
  },

  delete: async (id) => {
    return await apiRequest(`/medications/${id}`, {
      method: "DELETE",
    });
  },
};

// Mental health endpoints
const mentalHealth = {
  addAssessment: async (assessmentData) => {
    return await apiRequest("/mental-health/assessment", {
      method: "POST",
      body: JSON.stringify(assessmentData),
    });
  },

  getHistory: async (userId) => {
    return await apiRequest(`/mental-health/history/${userId}`);
  },

  getSummary: async (userId) => {
    return await apiRequest(`/mental-health/summary/${userId}`);
  },
};

export default {
  auth,
  symptoms,
  chat,
  nutrition,
  medications,
  mentalHealth,
  getAuthToken,
  clearAuthToken,
};
