

// Load environment variables
require('dotenv').config();
const path = require('path');
const environment = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: parseInt(process.env.PORT) || 3001,
  
  // Database
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/watchstore',
  
  // Auth0
  AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
  AUTH0_AUDIENCE: process.env.AUTH0_AUDIENCE || 'watch-store-api',
  AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
  AUTH0_CLIENT_SECRET: process.env.AUTH0_CLIENT_SECRET,
  
  // JWT
  JWT_SECRET: process.env.JWT_SECRET,
  
  // Stripe
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
  STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY,
  STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
  
  // CORS
  CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:5173',
  
  // File uploads
  UPLOAD_PATH: process.env.UPLOAD_PATH || path.join(__dirname, '../uploads'),
  MAX_FILE_SIZE: parseInt(process.env.MAX_FILE_SIZE) || 5 * 1024 * 1024, // 5MB
  
  // Email (if implementing email notifications)
  EMAIL_FROM: process.env.EMAIL_FROM,
  SMTP_HOST: process.env.SMTP_HOST,
  SMTP_PORT: parseInt(process.env.SMTP_PORT) || 587,
  SMTP_USER: process.env.SMTP_USER,
  SMTP_PASS: process.env.SMTP_PASS,
  
  // Application settings
  APP_NAME: 'WatchStore',
  APP_VERSION: '1.0.0',
  API_VERSION: 'v1',
  
  // Security settings
  BCRYPT_ROUNDS: parseInt(process.env.BCRYPT_ROUNDS) || 12,
  SESSION_SECRET: process.env.SESSION_SECRET,
  
  // Logging
  LOG_LEVEL: process.env.LOG_LEVEL || 'info',
  LOG_FILE: process.env.LOG_FILE || 'app.log'
};

// Validate required environment variables
const validateEnvironment = () => {
  const required = [
    'AUTH0_DOMAIN',
    'AUTH0_CLIENT_ID',
    'AUTH0_CLIENT_SECRET'
  ];
  
  const missing = required.filter(key => !environment[key]);
  
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
  
  // Validate MongoDB URI format
  if (!environment.MONGODB_URI.startsWith('mongodb')) {
    throw new Error('Invalid MongoDB URI format');
  }
  
  // Validate JWT secret length
  if (environment.JWT_SECRET && environment.JWT_SECRET.length < 32) {
    throw new Error('JWT_SECRET must be at least 32 characters long');
  }
  
  console.log('✅ Environment variables validated');
  console.log(`🚀 Running in ${environment.NODE_ENV} mode`);
  console.log(`🌐 CORS origin: ${environment.CORS_ORIGIN}`);
  
  return true;
};

module.exports = {
  environment,
  validateEnvironment
};