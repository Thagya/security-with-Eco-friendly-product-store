const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

if (!stripeSecretKey) {
  throw new Error('Stripe secret key not found in environment variables');
}

const stripe = require('stripe')(stripeSecretKey);

const stripeConfig = {
  secretKey: stripeSecretKey,
  publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
  currency: 'usd',
  paymentMethods: ['card'],
  captureMethod: 'automatic',
  confirmationMethod: 'automatic'
};

// Validate Stripe configuration
const validateStripeConfig = () => {
  if (!stripeConfig.secretKey) {
    throw new Error('Missing Stripe secret key');
  }
  
  if (!stripeConfig.webhookSecret) {
    console.warn('⚠️ Stripe webhook secret not configured - webhooks will not work');
  }
  
  console.log('💳 Stripe configuration validated');
  return true;
};

module.exports = {
  stripe,
  stripeConfig,
  validateStripeConfig
};
