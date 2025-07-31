import { StripeProvider, initStripe } from '@stripe/stripe-react-native';

// Initialize Stripe
export const initializeStripe = async () => {
  const publishableKey = process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY;
  
  if (!publishableKey) {
    throw new Error('Stripe publishable key is not configured');
  }

  await initStripe({
    publishableKey,
    merchantIdentifier: 'merchant.com.foodapp', // Your app's merchant identifier
    urlScheme: 'foodapp', // Your app's URL scheme
  });
};

// Create payment intent on your backend
export const createPaymentIntent = async (amount: number, currency: string = 'usd') => {
  try {
    // This should call your backend API that creates a payment intent
    // For now, we'll simulate the response structure
    // In a real app, you'd call: fetch('/api/create-payment-intent', ...)
    
    const response = await fetch('https://your-backend-api.com/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: Math.round(amount * 100), // Convert to cents
        currency,
      }),
    });

    const { client_secret } = await response.json();
    return { client_secret };
  } catch (error) {
    console.error('Error creating payment intent:', error);
    throw error;
  }
};

// Mock function for development - replace with actual backend call
export const createMockPaymentIntent = (amount: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        client_secret: `pi_mock_${Date.now()}_secret_mock`,
        amount: Math.round(amount * 100),
      });
    }, 1000);
  });
};