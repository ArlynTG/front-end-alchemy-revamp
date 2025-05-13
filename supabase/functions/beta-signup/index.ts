
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
    console.log("Function started");
    
    // Create a Supabase client with the service role key
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") || "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || ""
    );

    // Parse the request body
    const requestData = await req.json();
    console.log("Received registration data:", requestData);

    // Validate required fields
    if (!requestData.first_name || !requestData.last_name || !requestData.email || !requestData.plan_type) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Insert the registration data directly into the beta_registrations table
    const { data, error } = await supabaseAdmin
      .from("beta_registrations")
      .insert({
        first_name: requestData.first_name,
        last_name: requestData.last_name,
        email: requestData.email,
        phone: requestData.phone || null,
        student_name: requestData.student_name || null,
        student_age: requestData.student_age || null,
        learning_differences: requestData.learning_differences || null,
        plan_type: requestData.plan_type,
        status: "pending"
      });

    if (error) {
      console.error("Supabase insertion error:", error);
      
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

    console.log("Registration successful!");

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
      JSON.stringify({ error: "Failed to register", details: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
