import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'npm:@supabase/supabase-js@2.38.4'
import { Configuration, OpenAIApi } from 'npm:openai@3.2.1'

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

    const openai = new OpenAIApi(
      new Configuration({
        apiKey: Deno.env.get('OPENAI_API_KEY'),
      })
    )

    const { userId, preferences, caloriesTarget } = await req.json()

    // Generate meal plan using OpenAI
    const prompt = `Create a healthy meal plan considering these preferences: ${preferences.join(', ')} with a daily calorie target of ${caloriesTarget}`
    
    const completion = await openai.createCompletion({
      model: "gpt-3.5-turbo-instruct",
      prompt,
      max_tokens: 1000,
    })

    const mealPlan = completion.data.choices[0].text

    // Store the nutrition plan
    const { data, error } = await supabase
      .from('nutrition_plans')
      .insert({
        user_id: userId,
        dietary_preferences: preferences,
        meal_plan: { plan: mealPlan },
        calories_target: caloriesTarget
      })
      .select()

    if (error) throw error

    return new Response(
      JSON.stringify({ success: true, data }),
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