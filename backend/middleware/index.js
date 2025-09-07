// middleware/index.js
const { verifyToken, optionalAuth } = require('./auth');
const { validateOrder, validateObjectId, validateUserProfile, validatePayment } = require('./validation');
const { generalLimiter, authLimiter, paymentLimiter, orderLimiter, securityHeaders } = require('./security');
const { errorHandler, notFoundHandler } = require('./errorHandler');
const corsMiddleware = require('./cors');
const logger = require('./logger');  // ✅ this is fine


module.exports = {
  // Auth
  verifyToken,
  optionalAuth,

  // Validation
  validateOrder,
  validateObjectId,
  validateUserProfile,
  validatePayment,

  // Security
  generalLimiter,
  authLimiter,
  paymentLimiter,
  orderLimiter,
  securityHeaders,

  // Error handling
  errorHandler,
  notFoundHandler,

  // Others
  corsMiddleware,
  logger
};
