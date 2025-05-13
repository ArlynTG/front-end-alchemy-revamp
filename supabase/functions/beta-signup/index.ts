
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.23.0";

// CORS headers for browser requests
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    // Create a Supabase client with the service role key
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") || "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || ""
    );

    // Parse the request body
    const requestData = await req.json();

    // Insert data into beta_registrations
    const { data, error } = await supabaseAdmin
      .from("beta_registrations")
      .insert([requestData]);

    if (error) {
      console.error("Supabase error:", error);
      
      // Handle duplicate email error specifically
      if (error.code === '23505' && error.message.includes("email")) {
        return new Response(
          JSON.stringify({ 
            error: "This email has already been registered for the beta." 
          }),
          {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      
      throw error;
    }

    // Return success response with redirect URL
    return new Response(
      JSON.stringify({ 
        success: true, 
        redirectUrl: "https://buy.stripe.com/aEU29XbjrclwgO49ACxx"
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error in beta-signup function:", error);
    
    return new Response(
      JSON.stringify({ error: "Failed to register" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
