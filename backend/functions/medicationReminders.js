import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'npm:@supabase/supabase-js@2.38.4'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    )

    // Get all medications that need reminders
    const { data: medications, error: fetchError } = await supabase
      .from('medications')
      .select('*')
      .eq('reminder_enabled', true)
      .gte('end_date', new Date().toISOString().split('T')[0])

    if (fetchError) throw fetchError

    // Process reminders
    // Note: In a production environment, you would integrate with a proper notification service
    const processedReminders = medications.map(medication => ({
      medication_id: medication.id,
      user_id: medication.user_id,
      message: `Time to take ${medication.medication_name} - ${medication.dosage}`,
      scheduled_time: medication.reminder_time
    }))

    return new Response(
      JSON.stringify({ success: true, reminders: processedReminders }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )

  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    )
  }
})