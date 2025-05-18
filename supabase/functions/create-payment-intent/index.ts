
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
    // Initialize Stripe with secret key
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2023-10-16",
    });
    
    const { firstName, lastName, email } = await req.json();
    
    // Create a customer in Stripe
    const customer = await stripe.customers.create({
      email: email,
      name: `${firstName} ${lastName}`,
    });
    
    // Create a SetupIntent for the subscription process
    // This is more appropriate for subscriptions than PaymentIntent
    const setupIntent = await stripe.setupIntents.create({
      customer: customer.id,
      payment_method_types: ['card'],
      metadata: {
        firstName,
        lastName,
        email
      }
    });

    // After setup intent is confirmed, we would create a subscription in a webhook
    // This is just a note for future implementation
    /*
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: 'price_monthly_subscription' }], // Replace with your actual price ID
      default_payment_method: paymentMethodId,
    });
    */

    return new Response(
      JSON.stringify({ 
        clientSecret: setupIntent.client_secret,
        customerId: customer.id 
      }),
      { 
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200
      }
    );
  } catch (error) {
    console.error("Error creating payment intent:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500
      }
    );
  }
});
