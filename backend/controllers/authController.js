const { supabase } = require("../config/db");

/**
 * Create a new user account
 * @route POST /api/auth/signup
 */
async function signUp(req, res, next) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: "Email and password are required",
      });
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) throw error;

    res.status(201).json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Sign in a user
 * @route POST /api/auth/signin
 */
async function signIn(req, res, next) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: "Email and password are required",
      });
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Sign out current user
 * @route POST /api/auth/signout
 */
async function signOut(req, res, next) {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) throw error;

    res.status(200).json({
      success: true,
      message: "Successfully signed out",
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Get user profile
 * @route GET /api/auth/profile/:userId
 */
async function getProfile(req, res, next) {
  try {
    const { userId } = req.params;

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (error) throw error;

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Update user profile
 * @route PUT /api/auth/profile/:userId
 */
async function updateProfile(req, res, next) {
  try {
    const { userId } = req.params;
    const updates = req.body;

    // Ensure user can only update their own profile
    if (userId !== req.user.id) {
      return res.status(403).json({
        success: false,
        error: "Unauthorized to update this profile",
      });
    }

    const { data, error } = await supabase
      .from("profiles")
      .update(updates)
      .eq("id", userId)
      .select();

    if (error) throw error;

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  signUp,
  signIn,
  signOut,
  getProfile,
  updateProfile,
};
