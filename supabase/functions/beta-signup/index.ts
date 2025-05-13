
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

// Set CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      // Use Deno.env to access environment variables
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      { auth: { persistSession: false } }
    )

    const requestData = await req.json()
    
    // Parse the request data
    const { 
      firstName, 
      lastName, 
      email, 
      phone = null, 
      studentName = null, 
      studentAge = null, 
      learningDifference = null,
      planId = 'early-adopter' 
    } = requestData

    // Format the data for insertion
    const betaRegistration = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      phone: phone,
      student_name: studentName,
      student_age: studentAge,
      learning_differences: learningDifference ? [learningDifference] : [],
      plan_type: planId
    }

    // Insert the data using the service role client
    const { data, error } = await supabaseClient
      .from('beta_registrations')
      .insert(betaRegistration)
      .select()

    if (error) {
      throw error
    }

    // Return a success response
    return new Response(
      JSON.stringify({
        success: true,
        data: data[0],
        stripeUrl: 'https://buy.stripe.com/aEU29XbjrclwgO49AC'
      }),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json' 
        },
        status: 200 
      }
    )
  } catch (error) {
    console.error('Error in beta-signup function:', error)
    
    // Return an error response
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
        stripeUrl: 'https://buy.stripe.com/aEU29XbjrclwgO49AC' // Always include the Stripe URL
      }),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json' 
        },
        status: 400 
      }
    )
  }
})
