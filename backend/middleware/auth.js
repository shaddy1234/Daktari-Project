const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

/**
 * Authentication middleware
 * Verifies the JWT token in the Authorization header
 */
async function authMiddleware(req, res, next) {
  console.log("Auth middleware triggered for:", req.originalUrl);
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        error: "Unauthorized - No token provided",
      });
    }

    const token = authHeader.split(" ")[1];
    console.log(
      "Auth middleware: Token received (first 10 chars):",
      token.substring(0, 10)
    );

    // Verify token with Supabase
    console.log("Auth middleware: Verifying token with Supabase...");
    const { data, error } = await supabase.auth.getUser(token);

    if (error || !data.user) {
      console.error(
        "Auth middleware: Token verification failed.",
        error || "No user data returned"
      );
      return res.status(401).json({
        success: false,
        error: "Unauthorized - Invalid token",
      });
    }

    // Add user to request
    req.user = data.user;
    console.log(
      "Auth middleware: User authenticated:",
      req.user.id,
      req.user.email
    );

    // Create and attach user-specific Supabase client
    console.log("Auth middleware: Creating user-specific Supabase client.");
    req.supabaseUserClient = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_ANON_KEY, // Use ANON key for initialization
      { global: { headers: { Authorization: `Bearer ${token}` } } } // Pass user's token
    );

    console.log(
      "Auth middleware: User client created and attached to request."
    );

    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    return res.status(500).json({
      success: false,
      error: "Authentication error",
    });
  }
}

module.exports = {
  authMiddleware,
};
