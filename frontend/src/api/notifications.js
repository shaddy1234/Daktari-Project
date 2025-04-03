// Check if the browser supports notifications
const checkNotificationSupport = () => {
    if (!('Notification' in window)) {
      console.error('This browser does not support notifications');
      return false;
    }
    return true;
  };
  
  // Request notification permissions
  export const requestNotificationPermission = async () => {
    if (!checkNotificationSupport()) return false;
  
    try {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    } catch (error) {
      console.error('Error requesting notification permission:', error);
      return false;
    }
  };
  
  // Send a medication reminder notification
  export const sendMedicationReminder = (medication) => {
    if (!checkNotificationSupport()) return;
  
    try {
      const notification = new Notification('Medication Reminder', {
        body: `Time to take ${medication.medication_name} - ${medication.dosage}`,
        icon: '/favicon.ico', // Update with your app's icon
        tag: `medication-${medication.id}`,
      });
  
      notification.onclick = () => {
        window.focus();
        notification.close();
      };
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  };
  
  // Schedule medication reminders
  export const scheduleMedicationReminders = (medications) => {
    medications.forEach(medication => {
      if (!medication.reminder_enabled) return;
  
      medication.reminder_time.forEach(time => {
        const [hours, minutes] = time.split(':');
        const now = new Date();
        const reminderTime = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate(),
          parseInt(hours),
          parseInt(minutes)
        );
  
        // If the time has passed today, schedule for tomorrow
        if (reminderTime < now) {
          reminderTime.setDate(reminderTime.getDate() + 1);
        }
  
        const timeUntilReminder = reminderTime.getTime() - now.getTime();
  
        setTimeout(() => {
          sendMedicationReminder(medication);
          // Reschedule for the next day
          scheduleMedicationReminders([medication]);
        }, timeUntilReminder);
      });
    });
  };
  
  // Initialize reminders for all medications
  export const initializeMedicationReminders = async (userId, supabase) => {
    try {
      const { data: medications, error } = await supabase
        .from('medications')
        .select('*')
        .eq('user_id', userId)
        .eq('reminder_enabled', true)
        .gte('end_date', new Date().toISOString().split('T')[0]);
  
      if (error) throw error;
  
      if (medications.length > 0) {
        const hasPermission = await requestNotificationPermission();
        if (hasPermission) {
          scheduleMedicationReminders(medications);
        }
      }
    } catch (error) {
      console.error('Error initializing medication reminders:', error);
    }
  };