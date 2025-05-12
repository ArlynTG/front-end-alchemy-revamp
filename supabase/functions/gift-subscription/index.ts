
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get auth token from request header
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      throw new Error("No authorization header provided");
    }

    // Get recipient email from request body
    const { email } = await req.json();
    if (!email) {
      throw new Error("Recipient email is required");
    }

    // Initialize Stripe with secret key from environment
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2023-10-16",
    });

    // Create Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
    const supabaseClient = createClient(supabaseUrl, supabaseKey);

    // Get user information (gift sender)
    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
    
    if (userError) {
      throw new Error(`Authentication error: ${userError.message}`);
    }
    const user = userData.user;
    if (!user?.email) {
      throw new Error("User not authenticated or email not available");
    }

    // Find customer in Stripe for the gift sender
    const customers = await stripe.customers.list({
      email: user.email,
      limit: 1,
    });
    
    if (customers.data.length === 0) {
      throw new Error("No Stripe customer found for this user");
    }
    
    // Find active subscription for this customer
    const subscriptions = await stripe.subscriptions.list({
      customer: customers.data[0].id,
      status: 'active',
      limit: 1,
    });
    
    if (subscriptions.data.length === 0) {
      throw new Error("No active subscription found to gift");
    }

    // Generate a unique gift code
    const giftCode = `GIFT-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

    // Create a promotional code in Stripe for the gift (if available in your Stripe plan)
    const promotionCode = await stripe.promotionCodes.create({
      code: giftCode,
      coupon: "1_MONTH_FREE", // This requires creating a coupon in Stripe dashboard
      max_redemptions: 1,
      metadata: {
        gifted_by: user.email,
        gifted_to: email,
      },
    });

    // In a real implementation, you'd use Stripe's API to create a coupon or checkout session
    // For this demo, we'll simulate the gift process by saving to Supabase

    // Store gift information in Supabase
    const { data: giftData, error: giftError } = await supabaseClient.from("subscription_gifts").insert({
      sender_id: user.id,
      recipient_email: email,
      gift_code: giftCode,
      status: "pending",
      created_at: new Date().toISOString(),
    });

    if (giftError) {
      throw new Error(`Error storing gift information: ${giftError.message}`);
    }

    // In a real implementation, you would send an email to the recipient here
    // For demo purposes, we'll just return success

    return new Response(
      JSON.stringify({ 
        success: true,
        gift_code: giftCode,
        recipient: email
      }),
      { 
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    
    console.error("Error creating gift subscription:", errorMessage);
    
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { 
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});

// Function to create a Supabase client
function createClient(supabaseUrl: string, supabaseKey: string) {
  return {
    auth: {
      getUser: async (token: string) => {
        try {
          const response = await fetch(`${supabaseUrl}/auth/v1/user`, {
            headers: {
              Authorization: `Bearer ${token}`,
              apikey: supabaseKey,
            },
          });
          
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          
          const userData = await response.json();
          return { data: { user: userData }, error: null };
        } catch (error) {
          return { 
            data: { user: null }, 
            error: error instanceof Error ? error : new Error(String(error)) 
          };
        }
      }
    },
    from: (table: string) => {
      return {
        insert: async (data: any) => {
          try {
            const response = await fetch(`${supabaseUrl}/rest/v1/${table}`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${supabaseKey}`,
                'apikey': supabaseKey,
                'Prefer': 'return=representation'
              },
              body: JSON.stringify(data)
            });
            
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const responseData = await response.json();
            return { data: responseData, error: null };
          } catch (error) {
            return { 
              data: null, 
              error: error instanceof Error ? error : new Error(String(error)) 
            };
          }
        }
      };
    }
  };
}
