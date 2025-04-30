
import { supabase } from "@/integrations/supabase/client";

export interface PaymentErrorDetails {
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
  
  // Add timestamp if not provided
  if (!details.timestamp) {
    details.timestamp = new Date().toISOString();
  }
  
  // Log to database if user ID is available
  if (details.userId) {
    try {
      await supabase.from('payment_records').insert({
        registration_id: details.userId,
        payment_status: 'error',
        payment_method: 'stripe',
        stripe_customer_id: details.context?.stripeCustomerId || null,
        stripe_payment_id: details.context?.stripePaymentId || null,
        error_message: details.errorMessage,
        error_type: details.errorType,
        payment_date: details.timestamp
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
    customerId?: string,
    additionalData?: Record<string, any>
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
      payment_date: new Date().toISOString(),
      metadata: details?.additionalData || null
    });
    console.log(`Payment status recorded: ${status}`);
  } catch (error) {
    console.error("Failed to record payment status:", error);
  }
};

/**
 * Payment statistics tracker with enhanced monitoring
 */
class PaymentStatsTracker {
  private attempts: number = 0;
  private failures: number = 0;
  private threshold: number = 3;
  private notificationCallback?: (failures: number) => void;
  private lastResetTime: Date = new Date();
  private alertSent: boolean = false;
  
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
    
    if (this.failures >= this.threshold && this.notificationCallback && !this.alertSent) {
      this.notificationCallback(this.failures);
      this.alertSent = true;
      
      // Auto-reset after 24 hours to prevent alert fatigue
      setTimeout(() => {
        this.alertSent = false;
      }, 24 * 60 * 60 * 1000);
    }
    
    return this.failures;
  }
  
  reset() {
    this.attempts = 0;
    this.failures = 0;
    this.lastResetTime = new Date();
    this.alertSent = false;
  }
  
  getStats() {
    return {
      attempts: this.attempts,
      failures: this.failures,
      failureRate: this.attempts > 0 ? (this.failures / this.attempts) : 0,
      lastResetTime: this.lastResetTime.toISOString()
    };
  }
}

// Export a singleton instance with improved monitoring
export const paymentStats = new PaymentStatsTracker(3, (failures) => {
  const errorMessage = `ALERT: ${failures} payment failures detected. Check Stripe integration.`;
  console.warn(errorMessage);
  
  // Log to database for persistent monitoring
  logPaymentError({
    errorType: 'threshold_exceeded',
    errorMessage: errorMessage,
    context: { failureCount: failures }
  });
});
