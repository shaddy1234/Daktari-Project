const { createClient } = require("@supabase/supabase-js");

// Initialize the Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

// Middleware to attach Supabase client to request
const attachSupabase = (req, res, next) => {
  req.supabase = supabase;
  next();
};

module.exports = {
  supabase,
  attachSupabase,
};
