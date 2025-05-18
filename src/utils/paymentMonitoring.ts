
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
 * Logs payment errors to the console
 */
export const logPaymentError = async (details: PaymentErrorDetails): Promise<void> => {
  // Always log to console for debugging
  console.error(`Payment Error [${details.errorType}]:`, details.errorMessage, details.context);
  
  // Add timestamp if not provided
  if (!details.timestamp) {
    details.timestamp = new Date().toISOString();
  }
  
  // This function previously logged to Supabase, but is now just a console logger
  console.log("Payment error recorded:", details);
};

/**
 * Records payment attempt status (mock implementation)
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
    // Mock implementation that just logs to console
    console.log(`Payment status recorded for user ${userId}: ${status}`, details);
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
  const errorMessage = `ALERT: ${failures} payment failures detected. Check payment integration.`;
  console.warn(errorMessage);
  
  // Log to console for monitoring
  logPaymentError({
    errorType: 'threshold_exceeded',
    errorMessage: errorMessage,
    context: { failureCount: failures }
  });
});
