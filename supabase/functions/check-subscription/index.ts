
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

    // Initialize Stripe with secret key from environment
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2023-10-16",
    });

    // Create Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
    const supabaseKey = Deno.env.get("SUPABASE_ANON_KEY") || "";
    const supabaseClient = createClient(supabaseUrl, supabaseKey);

    // Get user information
    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
    
    if (userError) {
      throw new Error(`Authentication error: ${userError.message}`);
    }
    const user = userData.user;
    if (!user?.email) {
      throw new Error("User not authenticated or email not available");
    }

    // Find customer in Stripe
    const customers = await stripe.customers.list({
      email: user.email,
      limit: 1,
    });
    
    if (customers.data.length === 0) {
      // No customer record found, user is not subscribed
      return new Response(
        JSON.stringify({ 
          subscribed: false,
          subscription_tier: null,
          subscription_end: null,
          subscription_id: null
        }),
        { 
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 200,
        }
      );
    }
    
    const customerId = customers.data[0].id;

    // Find active subscription for this customer
    const subscriptions = await stripe.subscriptions.list({
      customer: customerId,
      status: 'active',
      limit: 1,
    });
    
    if (subscriptions.data.length === 0) {
      // No active subscription found
      return new Response(
        JSON.stringify({ 
          subscribed: false,
          subscription_tier: null,
          subscription_end: null,
          subscription_id: null,
          stripe_customer_id: customerId
        }),
        { 
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 200,
        }
      );
    }
    
    const subscription = subscriptions.data[0];
    
    // Get product and price information
    const priceId = subscription.items.data[0].price.id;
    const price = await stripe.prices.retrieve(priceId);
    const productId = price.product as string;
    const product = await stripe.products.retrieve(productId);
    
    // Determine subscription tier from product name or metadata
    let subscriptionTier = "Standard";
    if (product.name) {
      if (product.name.toLowerCase().includes("early adopter")) {
        subscriptionTier = "Early Adopter";
      } else if (product.name.toLowerCase().includes("premium")) {
        subscriptionTier = "Premium";
      } else if (product.name.toLowerCase().includes("annual")) {
        subscriptionTier = "Annual";
      }
    }

    return new Response(
      JSON.stringify({ 
        subscribed: true,
        subscription_tier: subscriptionTier,
        subscription_end: new Date(subscription.current_period_end * 1000).toISOString(),
        subscription_id: subscription.id,
        amount: price.unit_amount,
        interval: price.recurring?.interval || "month",
        cancel_at_period_end: subscription.cancel_at_period_end,
        stripe_customer_id: customerId
      }),
      { 
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    
    console.error("Error checking subscription:", errorMessage);
    
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
    }
  };
}
