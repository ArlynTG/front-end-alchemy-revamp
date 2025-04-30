
import { supabase } from "@/integrations/supabase/client";

interface PaymentErrorDetails {
  userId?: string | null;
  email?: string;
  errorType: string;
  errorMessage: string;
  context?: Record<string, any>;
  timestamp?: string;
}

export const PAYMENT_STATUSES = {
  INITIALIZED: 'initialized',
  PROCESSING: 'processing',
  COMPLETED: 'completed',
  FAILED: 'failed',
  ERROR: 'error',
  FALLBACK_INITIALIZED: 'fallback-initialized',
  CANCELLED: 'cancelled'
};

/**
 * Logs payment errors to the database and console
 */
export const logPaymentError = async (details: PaymentErrorDetails): Promise<void> => {
  // Always log to console for debugging
  console.error(`Payment Error [${details.errorType}]:`, details.errorMessage, details.context);
  
  // Log to database if user ID is available
  if (details.userId) {
    try {
      await supabase.from('payment_records').insert({
        registration_id: details.userId,
        payment_status: 'error',
        payment_method: 'stripe',
        stripe_customer_id: details.context?.stripeCustomerId || null,
        stripe_payment_id: details.context?.stripePaymentId || null
      });
      console.log("Error logged to database successfully");
    } catch (error) {
      console.error("Failed to log payment error to database:", error);
    }
  }
};

/**
 * Records payment attempt status in database
 */
export const recordPaymentStatus = async (
  userId: string,
  status: string,
  details?: { 
    amount?: number,
    paymentMethod?: string,
    paymentId?: string,
    customerId?: string
  }
): Promise<void> => {
  try {
    await supabase.from('payment_records').insert({
      registration_id: userId,
      payment_status: status,
      payment_method: details?.paymentMethod || 'stripe',
      payment_amount: details?.amount || 100, // $1.00 default
      stripe_payment_id: details?.paymentId,
      stripe_customer_id: details?.customerId,
      payment_date: new Date().toISOString()
    });
    console.log(`Payment status recorded: ${status}`);
  } catch (error) {
    console.error("Failed to record payment status:", error);
  }
};

/**
 * Payment statistics tracker
 */
class PaymentStatsTracker {
  private attempts: number = 0;
  private failures: number = 0;
  private threshold: number = 3;
  private notificationCallback?: (failures: number) => void;
  
  constructor(threshold?: number, callback?: (failures: number) => void) {
    if (threshold) this.threshold = threshold;
    if (callback) this.notificationCallback = callback;
  }
  
  recordAttempt() {
    this.attempts++;
    return this.attempts;
  }
  
  recordFailure() {
    this.failures++;
    
    if (this.failures >= this.threshold && this.notificationCallback) {
      this.notificationCallback(this.failures);
      this.reset();
    }
    
    return this.failures;
  }
  
  reset() {
    this.attempts = 0;
    this.failures = 0;
  }
  
  getStats() {
    return {
      attempts: this.attempts,
      failures: this.failures,
      failureRate: this.attempts > 0 ? (this.failures / this.attempts) : 0
    };
  }
}

// Export a singleton instance
export const paymentStats = new PaymentStatsTracker(3, (failures) => {
  console.warn(`ALERT: ${failures} payment failures detected. Check Stripe integration.`);
});
