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

    const { symptoms, userId } = await req.json()

    // Analyze symptoms using OpenAI
    const prompt = `As a medical AI assistant, analyze these symptoms and provide a preliminary assessment: ${symptoms.join(', ')}`
    
    const completion = await openai.createCompletion({
      model: "gpt-3.5-turbo-instruct",
      prompt,
      max_tokens: 500,
    })

    const analysis = completion.data.choices[0].text

    // Store the symptoms and analysis
    const { data, error } = await supabase
      .from('symptoms')
      .insert({
        user_id: userId,
        symptoms,
        ai_analysis: { analysis }
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