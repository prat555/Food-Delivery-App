# Stripe Payment Integration Setup Guide

This guide will help you set up Stripe payment integration in your React Native food delivery app.

## 📋 Prerequisites

1. **Stripe Account**: Create a free account at [stripe.com](https://stripe.com)
2. **API Keys**: Get your API keys from the [Stripe Dashboard](https://dashboard.stripe.com/apikeys)
3. **Backend Server**: You'll need a backend to securely handle payment intents

## 🔧 Setup Instructions

### 1. Environment Configuration

Update your `.env.local` file with your actual Stripe keys:

```env
# Replace with your actual Stripe keys
EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_actual_publishable_key_here
STRIPE_SECRET_KEY=sk_test_your_actual_secret_key_here
```

**Important**: 
- Only the publishable key (starts with `pk_`) should be used in your React Native app
- The secret key (starts with `sk_`) should ONLY be used on your backend server
- Never commit real API keys to version control

### 2. Backend Setup

You need a backend server to create payment intents securely. Here's a sample Node.js/Express endpoint:

```javascript
// Backend endpoint example (Node.js/Express)
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

app.post('/create-payment-intent', async (req, res) => {
  try {
    const { amount, currency = 'usd', description, customer_email } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount, // Amount in cents
      currency: currency,
      description: description,
      receipt_email: customer_email,
      metadata: {
        // Add any metadata you need
        order_id: req.body.order_id,
        customer_id: req.body.customer_id,
      },
    });

    res.send({
      client_secret: paymentIntent.client_secret,
      id: paymentIntent.id,
    });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});
```

### 3. Update API Endpoints

In `lib/payment-service.ts`, update the `API_BASE_URL` with your actual backend URL:

```typescript
const API_BASE_URL = 'https://your-actual-backend-url.com';
```

### 4. Testing

#### Test Cards
Use these test card numbers for development:

| Card Number | Brand | Description |
|-------------|--------|-------------|
| 4242424242424242 | Visa | Succeeds |
| 4000000000000002 | Visa | Declined |
| 4000000000009995 | Visa | Insufficient funds |
| 4000000000000069 | Visa | Expired card |

#### Test Flow
1. Add items to cart
2. Go to cart and click "Proceed to Checkout"
3. Enter test card details
4. Complete payment
5. See order confirmation

### 5. Production Deployment

Before going live:

1. **Switch to Live Keys**: Replace test keys with live keys from Stripe Dashboard
2. **Enable Webhooks**: Set up webhook endpoints to handle payment events
3. **SSL Certificate**: Ensure your backend has proper SSL
4. **Error Handling**: Test various error scenarios
5. **Compliance**: Ensure PCI compliance if handling card data

## 🔒 Security Best Practices

1. **Never expose secret keys** in your React Native app
2. **Always validate payments** on your backend using webhooks
3. **Use HTTPS** for all payment-related communications
4. **Implement proper error handling** for failed payments
5. **Store minimal payment data** and follow PCI compliance guidelines

## 📱 Features Implemented

### ✅ Current Features
- Stripe SDK integration
- Payment form with card input
- Order summary display
- Payment processing with loading states
- Error handling for failed payments
- Order confirmation screen
- Cart integration

### 🚀 Suggested Enhancements
- Save payment methods for returning customers
- Subscription payments for meal plans
- Apple Pay / Google Pay integration
- Multi-currency support
- Refund handling
- Payment analytics and reporting

## 🛠 Webhooks Setup

Set up these webhook events in your Stripe Dashboard:

```
payment_intent.succeeded
payment_intent.payment_failed
charge.dispute.created
```

Example webhook handler:

```javascript
app.post('/webhook', express.raw({type: 'application/json'}), (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  switch (event.type) {
    case 'payment_intent.succeeded':
      // Handle successful payment
      console.log('Payment succeeded!', event.data.object);
      break;
    case 'payment_intent.payment_failed':
      // Handle failed payment
      console.log('Payment failed!', event.data.object);
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({received: true});
});
```

## 🐛 Troubleshooting

### Common Issues

1. **"Stripe not initialized" error**
   - Ensure `EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY` is set correctly
   - Check that `initializeStripe()` is called in your app root

2. **Card input not working**
   - Verify Stripe plugin is added to `app.json`
   - Ensure app is wrapped with `StripeProvider`

3. **Payment intent creation fails**
   - Check backend URL is correct
   - Verify secret key is valid
   - Check network connectivity

4. **iOS build issues**
   - Run `cd ios && pod install` after adding Stripe
   - Clean and rebuild the project

## 📞 Support

- [Stripe Documentation](https://stripe.com/docs)
- [Stripe React Native SDK](https://github.com/stripe/stripe-react-native)
- [Stripe Support](https://support.stripe.com/)

## 🔄 Updates

Keep your Stripe dependencies updated:

```bash
npm update @stripe/stripe-react-native
```

---

**Note**: This implementation includes both production-ready code and mock/development code for testing. Make sure to properly configure your backend and use real Stripe keys for production deployment.