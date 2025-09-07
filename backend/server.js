// server.js - Updated with proper structure
require('dotenv').config();

const express = require('express');



const { connectDB, environment, validateEnvironment, validateAuth0Config, validateStripeConfig } = require('./config');
const { 
  securityHeaders, 
  generalLimiter, 
  corsMiddleware, 
  logger, 
  errorHandler, 
  notFoundHandler 
} = require('./middleware');
const routes = require('./routes');

const app = express();
const PORT = environment.PORT;

// Validate configuration before starting
try {
  validateEnvironment();
  validateAuth0Config();
  
  if (environment.STRIPE_SECRET_KEY) {
    validateStripeConfig();
  }
} catch (error) {
  console.error('❌ Configuration error:', error.message);
  process.exit(1);
}

// Connect to MongoDB
connectDB();

// Trust proxy (important for rate limiting behind reverse proxy)
app.set('trust proxy', 1);

// Security middleware (should be first)
app.use(securityHeaders);

// CORS middleware
app.use(corsMiddleware);

// Rate limiting
app.use(generalLimiter);

// Request logging
app.use(logger);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Raw body for Stripe webhooks (before other body parsing)
app.use('/api/payment/webhook', express.raw({ type: 'application/json' }));

// API routes
app.use('/api', routes);

// Health check endpoint (without auth)
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    service: 'WatchStore API',
    version: environment.APP_VERSION,
    environment: environment.NODE_ENV
  });
});

// 404 handler for undefined routes
app.use('*', notFoundHandler);

// Error handling middleware (should be last)
app.use(errorHandler);

// Graceful shutdown handlers
const gracefulShutdown = async (signal) => {
  console.log(`\n🛑 Received ${signal}. Starting graceful shutdown...`);
  
  // Stop accepting new connections
  const server = app.listen(PORT);
  server.close(() => {
    console.log('📴 HTTP server closed');
  });
  
  // Close database connections
  try {
    const mongoose = require('mongoose');
    await mongoose.connection.close();
    console.log('🍃 MongoDB connection closed');
  } catch (error) {
    console.error('Error closing MongoDB connection:', error);
  }
  
  console.log('✅ Graceful shutdown complete');
  process.exit(0);
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('💥 Uncaught Exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('💥 Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

// Start server
const server = app.listen(PORT, () => {
  console.log('\n🚀 ==========================================');
  console.log(`🎯 WatchStore API Server Started`);
  console.log(`📍 Port: ${PORT}`);
  console.log(`🌍 Environment: ${environment.NODE_ENV}`);
  console.log(`🔒 Auth0 Domain: ${environment.AUTH0_DOMAIN}`);
  console.log(`💳 Stripe: ${environment.STRIPE_SECRET_KEY ? 'Configured' : 'Not configured'}`);
  console.log(`🍃 MongoDB: Connected`);
  console.log(`⏰ Started at: ${new Date().toISOString()}`);
  console.log('🚀 ==========================================\n');
});

module.exports = app;