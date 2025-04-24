/**
 * Add a new medication
 * @route POST /api/medications
 */
async function addMedication(req, res, next) {
  try {
    const {
      userId,
      medicationName,
      dosage,
      frequency,
      startDate,
      endDate,
      reminderEnabled,
      reminderTime,
    } = req.body;

    if (!userId || !medicationName) {
      return res.status(400).json({
        success: false,
        error: "User ID and medication name are required",
      });
    }

    // Ensure user can only add their own medications
    if (userId !== req.user.id) {
      return res.status(403).json({
        success: false,
        error: "Unauthorized to add medication for this user",
      });
    }

    const { data, error } = await req.supabase
      .from("medications")
      .insert({
        user_id: userId,
        medication_name: medicationName,
        dosage,
        frequency,
        start_date: startDate,
        end_date: endDate,
        reminder_enabled: reminderEnabled || false,
        reminder_time: reminderTime || [],
      })
      .select();

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
 * Get all medications for a user
 * @route GET /api/medications/:userId
 */
async function getMedications(req, res, next) {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        success: false,
        error: "User ID is required",
      });
    }

    // Ensure user can only view their own medications
    if (userId !== req.user.id) {
      return res.status(403).json({
        success: false,
        error: "Unauthorized to view medications for this user",
      });
    }

    const { data, error } = await req.supabase
      .from("medications")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

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
 * Update a medication
 * @route PUT /api/medications/:id
 */
async function updateMedication(req, res, next) {
  try {
    const { id } = req.params;
    const updates = req.body;

    // First, get the medication to check ownership
    const { data: medication, error: fetchError } = await req.supabase
      .from("medications")
      .select("user_id")
      .eq("id", id)
      .single();

    if (fetchError) throw fetchError;

    // Ensure user can only update their own medications
    if (medication.user_id !== req.user.id) {
      return res.status(403).json({
        success: false,
        error: "Unauthorized to update this medication",
      });
    }

    const { data, error } = await req.supabase
      .from("medications")
      .update(updates)
      .eq("id", id)
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

/**
 * Delete a medication
 * @route DELETE /api/medications/:id
 */
async function deleteMedication(req, res, next) {
  try {
    const { id } = req.params;

    // First, get the medication to check ownership
    const { data: medication, error: fetchError } = await req.supabase
      .from("medications")
      .select("user_id")
      .eq("id", id)
      .single();

    if (fetchError) throw fetchError;

    // Ensure user can only delete their own medications
    if (medication.user_id !== req.user.id) {
      return res.status(403).json({
        success: false,
        error: "Unauthorized to delete this medication",
      });
    }

    const { error } = await req.supabase
      .from("medications")
      .delete()
      .eq("id", id);

    if (error) throw error;

    res.status(200).json({
      success: true,
      message: "Medication deleted successfully",
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  addMedication,
  getMedications,
  updateMedication,
  deleteMedication,
};
