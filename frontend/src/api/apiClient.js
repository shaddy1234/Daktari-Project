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
  console.log("Token retrieved for header:", token); // <-- Add this log
  if (!token) {
    console.error("Auth token is missing!"); // <-- Add this check
  }
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
};

// API request wrapper with error handling
async function apiRequest(endpoint, options = {}) {
  const url = `${API_URL}${endpoint}`;

  // Add auth headers to authenticated requests
  // Default to authenticated unless explicitly set to false
  if (options.authenticated !== false) {
    options.headers = {
      ...getAuthHeaders(),
      ...(options.headers || {}),
    };
    console.log(
      `Sending request to ${endpoint} with headers:`,
      options.headers
    ); // <-- Add this log
  }

  try {
    const response = await fetch(url, options);

    // Check if response is JSON before parsing
    const contentType = response.headers.get("content-type");
    let data;
    if (contentType && contentType.indexOf("application/json") !== -1) {
      data = await response.json();
    } else {
      // Handle non-JSON responses if necessary, e.g., for DELETE success with no body
      data = { success: response.ok, status: response.status };
    }

    if (!response.ok) {
      // Use error message from JSON data if available, otherwise use status text
      throw new Error(
        data?.error || response.statusText || "Something went wrong"
      );
    }

    return data;
  } catch (error) {
    console.error(`API Error (${endpoint}):`, error);
    // Ensure the error thrown has a message property
    throw new Error(error.message || "An unknown API error occurred");
  }
}

// Auth endpoints
const auth = {
  signUp: async (email, password) => {
    const response = await apiRequest("/auth/signup", {
      method: "POST",
      authenticated: false, // Explicitly false for signup
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (response.success && response.data) {
      setAuthToken(response.data); // Assuming response.data contains the session object
    }

    return response;
  },

  signIn: async (email, password) => {
    const response = await apiRequest("/auth/signin", {
      method: "POST",
      authenticated: false, // Explicitly false for signin
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (response.success && response.data) {
      setAuthToken(response.data); // Assuming response.data contains the session object
    }

    return response;
  },

  signOut: async () => {
    // Sign out might not need auth depending on backend implementation
    // Assuming it does for session invalidation server-side
    const response = await apiRequest("/auth/signout", {
      method: "POST",
      // authenticated: true (default)
    });

    // Always clear token on frontend regardless of backend response for signout
    clearAuthToken();

    return response;
  },

  getProfile: async (userId) => {
    return await apiRequest(`/auth/profile/${userId}`); // authenticated: true (default)
  },

  updateProfile: async (userId, updates) => {
    return await apiRequest(`/auth/profile/${userId}`, {
      method: "PUT",
      body: JSON.stringify(updates), // Content-Type header added by default
      // authenticated: true (default)
    });
  },
};

// Symptom endpoints
const symptoms = {
  analyze: async (symptoms, userId) => {
    return await apiRequest("/symptoms/analyze", {
      method: "POST",
      body: JSON.stringify({ symptoms, userId }),
      // authenticated: true (default)
    });
  },

  getHistory: async (userId) => {
    return await apiRequest(`/symptoms/history/${userId}`); // authenticated: true (default)
  },
};

// Chat endpoints
const chat = {
  sendMessage: async (message, userId) => {
    return await apiRequest("/chat/message", {
      method: "POST",
      body: JSON.stringify({ message, userId }),
      // authenticated: true (default)
    });
  },

  getHistory: async (userId) => {
    return await apiRequest(`/chat/history/${userId}`); // authenticated: true (default)
  },

  // Add function to clear history
  clearHistory: async (userId) => {
    return await apiRequest(`/chat/history/${userId}`, {
      method: "DELETE",
      // authenticated: true (default)
    });
  },
};

// Nutrition endpoints
const nutrition = {
  createPlan: async (preferences, caloriesTarget, userId) => {
    return await apiRequest("/nutrition/plan", {
      method: "POST",
      body: JSON.stringify({ preferences, caloriesTarget, userId }),
      // authenticated: true (default)
    });
  },

  getPlans: async (userId) => {
    return await apiRequest(`/nutrition/plans/${userId}`); // authenticated: true (default)
  },

  getPlan: async (id) => {
    return await apiRequest(`/nutrition/plan/${id}`); // authenticated: true (default)
  },
};

// Medication endpoints
const medications = {
  add: async (medicationData) => {
    // Assuming medicationData contains userId or it's inferred from token on backend
    return await apiRequest("/medications", {
      method: "POST",
      body: JSON.stringify(medicationData),
      // authenticated: true (default)
    });
  },

  get: async (userId) => {
    return await apiRequest(`/medications/${userId}`); // authenticated: true (default)
  },

  update: async (id, updates) => {
    return await apiRequest(`/medications/${id}`, {
      method: "PUT",
      body: JSON.stringify(updates),
      // authenticated: true (default)
    });
  },

  delete: async (id) => {
    return await apiRequest(`/medications/${id}`, {
      method: "DELETE",
      // authenticated: true (default)
    });
  },
};

// Mental health endpoints
const mentalHealth = {
  addAssessment: async (assessmentData) => {
    // Assuming assessmentData contains userId or it's inferred from token
    return await apiRequest("/mental-health/assessment", {
      method: "POST",
      body: JSON.stringify(assessmentData),
      // authenticated: true (default)
    });
  },

  // Add this function for analysis
  analyzeAssessment: async (assessmentData) => {
    // This endpoint will perform the AI analysis
    return await apiRequest("/mental-health/analyze", {
      // New endpoint
      method: "POST",
      body: JSON.stringify(assessmentData),
      // authenticated: true (default)
    });
  },

  getHistory: async (userId) => {
    return await apiRequest(`/mental-health/history/${userId}`); // authenticated: true (default)
  },

  getSummary: async (userId) => {
    return await apiRequest(`/mental-health/summary/${userId}`); // authenticated: true (default)
  },
};

export default {
  auth,
  symptoms,
  chat,
  nutrition,
  medications,
  mentalHealth,
  getAuthToken, // Keep export if used directly elsewhere (e.g., AuthContext)
  clearAuthToken, // Keep export if used directly elsewhere (e.g., AuthContext)
};
