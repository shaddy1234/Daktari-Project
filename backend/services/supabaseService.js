const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

/**
 * Save chat interaction to database
 * @param {string} userId - User ID
 * @param {string} message - User message
 * @param {string} aiResponse - AI response
 * @returns {Promise<Object>} - Saved chat data
 */
async function saveChatInteraction(userId, message, aiResponse) {
  const { data, error } = await supabase
    .from("chat_history")
    .insert({
      user_id: userId,
      message,
      ai_response: aiResponse,
    })
    .select();

  if (error) throw error;
  return data;
}

/**
 * Get user chat history
 * @param {string} userId - User ID
 * @returns {Promise<Array>} - Chat history
 */
async function getChatHistory(userId) {
  const { data, error } = await supabase
    .from("chat_history")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

// Similar functions for symptoms, nutrition plans, medications, etc.

module.exports = {
  saveChatInteraction,
  getChatHistory,
  // Export other functions
};
