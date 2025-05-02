// import React, { createContext, useContext, useEffect, useState } from "react";
// import api from "../api/apiClient";

// const AuthContext = createContext(null);

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const sessionData = localStorage.getItem("supabase.auth.token");

//   const userId = sessionData ? JSON.parse(sessionData).session.user.id : null;

//   console.log("User ID from session data:", userId);

//   // Check if user is already logged in on initial load
//   useEffect(() => {
//     async function loadUser() {
//       try {
//         const token = api.getAuthToken();
//         if (!token) {
//           setLoading(false);
//           return;
//         }

//         // Verify the token with backend
//         // This would be a good place to add a /me endpoint to your API
//         // For now, we'll just assume the token is valid if it exists
//         setUser({ id: userId }); // Replace with actual user info
//       } catch (error) {
//         console.error("Failed to load user:", error);
//       } finally {
//         setLoading(false);
//       }
//     }

//     loadUser();
//   }, []);

//   const login = async (email, password) => {
//     const response = await api.auth.signIn(email, password);
//     if (response.success) {
//       setUser(response.data.user);
//     }
//     return response;
//   };

//   const signup = async (email, password) => {
//     const response = await api.auth.signUp(email, password);
//     if (response.success) {
//       setUser(response.data.user);
//     }
//     return response;
//   };

//   const logout = async () => {
//     const response = await api.auth.signOut();
//     if (response.success) {
//       setUser(null);
//     }
//     return response;
//   };

//   const value = {
//     user,
//     loading,
//     login,
//     signup,
//     logout,
//     isAuthenticated: !!user,
//   };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// }

// export function useAuth() {
//   const context = useContext(AuthContext);
//   if (context === null) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// }



import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../api/apiClient";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Safely parse the session data from localStorage
  const sessionDataRaw = localStorage.getItem("supabase.auth.token");
  let userId = null;
  if (sessionDataRaw) {
    try {
      const parsedData = JSON.parse(sessionDataRaw);
      userId = parsedData?.session?.user?.id || null;
    } catch (error) {
      console.error("Failed to parse session data:", error);
    }
  }
  
  console.log("User ID from session data:", userId);

  useEffect(() => {
    async function loadUser() {
      try {
        if (!userId) {
          setLoading(false);
          return;
        }
        // Replace with actual user fetching logic if needed
        setUser({ id: userId });
      } catch (error) {
        console.error("Failed to load user:", error);
      } finally {
        setLoading(false);
      }
    }
    loadUser();
  }, [userId]);

  const login = async (email, password) => {
    const response = await api.auth.signIn(email, password);
    if (response.success) {
      setUser(response.data.user);
    }
    return response;
  };

  const signup = async (email, password) => {
    const response = await api.auth.signUp(email, password);
    if (response.success) {
      setUser(response.data.user);
    }
    return response;
  };

  const logout = async () => {
    const response = await api.auth.signOut();
    setUser(null);
    return response;
  };

  const value = {
    user,
    loading,
    login,
    signup,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}