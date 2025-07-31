import { Alert } from 'react-native';
import { useStripe } from '@stripe/stripe-react-native';

export interface PaymentData {
  amount: number;
  currency?: string;
  description?: string;
  customerEmail?: string;
  metadata?: Record<string, string>;
}

export interface PaymentResult {
  success: boolean;
  paymentIntentId?: string;
  error?: string;
}

// Backend API endpoints - replace with your actual backend URLs
const API_BASE_URL = 'https://your-backend-api.com';

export class PaymentService {
  /**
   * Create a payment intent on your backend
   */
  static async createPaymentIntent(paymentData: PaymentData): Promise<{ clientSecret: string; paymentIntentId: string }> {
    try {
      const response = await fetch(`${API_BASE_URL}/create-payment-intent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add authorization headers if needed
          // 'Authorization': `Bearer ${userToken}`,
        },
        body: JSON.stringify({
          amount: Math.round(paymentData.amount * 100), // Convert to cents
          currency: paymentData.currency || 'usd',
          description: paymentData.description,
          customer_email: paymentData.customerEmail,
          metadata: paymentData.metadata,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return {
        clientSecret: data.client_secret,
        paymentIntentId: data.id,
      };
    } catch (error) {
      console.error('Error creating payment intent:', error);
      throw new Error('Failed to initialize payment. Please try again.');
    }
  }

  /**
   * Confirm payment with Stripe
   */
  static async confirmPayment(
    clientSecret: string,
    paymentMethodData: any,
    confirmPayment: Function
  ): Promise<PaymentResult> {
    try {
      const { error, paymentIntent } = await confirmPayment(clientSecret, {
        paymentMethodType: 'Card',
        paymentMethodData,
      });

      if (error) {
        console.error('Payment confirmation error:', error);
        
        // Handle specific error types
        let errorMessage = 'Payment failed. Please try again.';
        
        switch (error.code) {
          case 'card_declined':
            errorMessage = 'Your card was declined. Please try a different payment method.';
            break;
          case 'insufficient_funds':
            errorMessage = 'Insufficient funds. Please check your account balance.';
            break;
          case 'incorrect_cvc':
            errorMessage = 'Your card\'s security code is incorrect.';
            break;
          case 'expired_card':
            errorMessage = 'Your card has expired. Please use a different card.';
            break;
          case 'processing_error':
            errorMessage = 'An error occurred while processing your card. Please try again.';
            break;
          default:
            errorMessage = error.localizedMessage || error.message || errorMessage;
        }

        return { success: false, error: errorMessage };
      }

      if (paymentIntent?.status === 'succeeded') {
        return { 
          success: true, 
          paymentIntentId: paymentIntent.id 
        };
      } else {
        return { 
          success: false, 
          error: 'Payment was not completed successfully.' 
        };
      }
    } catch (error) {
      console.error('Payment processing error:', error);
      return { 
        success: false, 
        error: 'An unexpected error occurred. Please try again.' 
      };
    }
  }

  /**
   * Update payment status on your backend
   */
  static async updateOrderStatus(paymentIntentId: string, orderData: any): Promise<void> {
    try {
      await fetch(`${API_BASE_URL}/orders/update-payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add authorization headers if needed
          // 'Authorization': `Bearer ${userToken}`,
        },
        body: JSON.stringify({
          payment_intent_id: paymentIntentId,
          order_data: orderData,
          status: 'paid',
        }),
      });
    } catch (error) {
      console.error('Error updating order status:', error);
      // Don't throw here as payment was successful, just log the error
    }
  }

  /**
   * Handle webhook events (this would typically be on your backend)
   * This is just for reference on what webhook events you should handle
   */
  static getWebhookEvents() {
    return [
      'payment_intent.succeeded',
      'payment_intent.payment_failed',
      'charge.dispute.created',
      'invoice.payment_succeeded',
      'invoice.payment_failed',
    ];
  }
}

// Hook for using payment service in React components
export const usePaymentService = () => {
  const { confirmPayment } = useStripe();

  const processPayment = async (
    paymentData: PaymentData,
    paymentMethodData?: any
  ): Promise<PaymentResult> => {
    try {
      // Step 1: Create payment intent
      const { clientSecret, paymentIntentId } = await PaymentService.createPaymentIntent(paymentData);

      // Step 2: Confirm payment
      const result = await PaymentService.confirmPayment(
        clientSecret,
        paymentMethodData,
        confirmPayment
      );

      // Step 3: Update backend if payment succeeded
      if (result.success && result.paymentIntentId) {
        await PaymentService.updateOrderStatus(result.paymentIntentId, paymentData.metadata);
      }

      return result;
    } catch (error) {
      console.error('Payment service error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Payment processing failed',
      };
    }
  };

  return { processPayment };
};

// Development/Mock payment service for testing
export class MockPaymentService {
  static async createMockPaymentIntent(amount: number): Promise<{ clientSecret: string; paymentIntentId: string }> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          clientSecret: `pi_mock_${Date.now()}_secret_mock`,
          paymentIntentId: `pi_mock_${Date.now()}`,
        });
      }, 1000);
    });
  }

  static async confirmMockPayment(): Promise<PaymentResult> {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulate 90% success rate for testing
        const success = Math.random() > 0.1;
        
        if (success) {
          resolve({
            success: true,
            paymentIntentId: `pi_mock_${Date.now()}`,
          });
        } else {
          resolve({
            success: false,
            error: 'Mock payment failed for testing purposes',
          });
        }
      }, 2000);
    });
  }
}