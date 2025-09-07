const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { verifyToken } = require('../middleware/auth');
const { Order, User } = require('../models');
const router = express.Router();

// Create payment intent
router.post('/create-payment-intent', verifyToken, async (req, res) => {
  try {
    const { orderId } = req.body;
    
    // Find the order
    const order = await Order.findOne({ 
      _id: orderId, 
      userId: req.user.sub,
      paymentStatus: 'pending'
    });
    
    if (!order) {
      return res.status(404).json({ error: 'Order not found or already paid' });
    }
    
    // Get user info
    const user = await User.findOne({ auth0Id: req.user.sub });
    
    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(order.totalAmount * 100), // Convert to cents
      currency: 'usd',
      metadata: {
        orderId: order._id.toString(),
        userId: req.user.sub,
        productName: order.productName,
        quantity: order.quantity.toString()
      },
      description: `Watch purchase: ${order.productName} x${order.quantity}`,
      receipt_email: user.email
    });
    
    // Update order with payment intent ID
    order.paymentIntentId = paymentIntent.id;
    await order.save();
    
    res.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id
    });
    
  } catch (error) {
    console.error('Payment intent creation error:', error);
    res.status(500).json({ error: 'Failed to create payment intent' });
  }
});

// Confirm payment
router.post('/confirm-payment', verifyToken, async (req, res) => {
  try {
    const { paymentIntentId } = req.body;
    
    // Retrieve payment intent from Stripe
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    
    if (paymentIntent.status === 'succeeded') {
      // Update order payment status
      const order = await Order.findOneAndUpdate(
        { 
          paymentIntentId: paymentIntentId,
          userId: req.user.sub
        },
        { 
          paymentStatus: 'completed',
          status: 'processing',
          updatedAt: new Date()
        },
        { new: true }
      );
      
      if (order) {
        res.json({ 
          success: true, 
          message: 'Payment confirmed successfully',
          order 
        });
      } else {
        res.status(404).json({ error: 'Order not found' });
      }
    } else {
      res.status(400).json({ error: 'Payment not completed' });
    }
    
  } catch (error) {
    console.error('Payment confirmation error:', error);
    res.status(500).json({ error: 'Failed to confirm payment' });
  }
});

// Stripe webhook for payment events
router.post('/webhook', express.raw({type: 'application/json'}), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  
  try {
    const event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object;
        
        // Update order status
        await Order.findOneAndUpdate(
          { paymentIntentId: paymentIntent.id },
          { 
            paymentStatus: 'completed',
            status: 'processing',
            updatedAt: new Date()
          }
        );
        
        console.log('Payment succeeded:', paymentIntent.id);
        break;
        
      case 'payment_intent.payment_failed':
        const failedPayment = event.data.object;
        
        // Update order status
        await Order.findOneAndUpdate(
          { paymentIntentId: failedPayment.id },
          { 
            paymentStatus: 'failed',
            updatedAt: new Date()
          }
        );
        
        console.log('Payment failed:', failedPayment.id);
        break;
        
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }
    
    res.json({ received: true });
    
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(400).send(`Webhook Error: ${error.message}`);
  }
});

module.exports = router;