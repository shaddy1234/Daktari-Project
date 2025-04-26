const { createClient } = require("@supabase/supabase-js");

// Ensure SERVICE_ROLE_KEY is loaded from .env
if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_KEY) {
  console.error(
    "FATAL ERROR: SUPABASE_URL and SUPABASE_SERVICE_KEY must be defined in .env"
  );
  // In a real app, you might handle this more gracefully, but for MVP, exiting is clear.
  process.exit(1);
}

// Initialize the Supabase client WITH THE SERVICE ROLE KEY
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY, // Use Service Role Key
  {
    auth: {
      // Required for service role client to prevent automatic session management
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

console.log("✅ Initialized Supabase client with Service Role Key."); // Confirmation log

// Middleware to attach Supabase client to request
const attachSupabase = (req, res, next) => {
  req.supabase = supabase; // This attached client now has service role privileges
  next();
};

module.exports = {
  supabase, // Export the service role client
  attachSupabase,
};
