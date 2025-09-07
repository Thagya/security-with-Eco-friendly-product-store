// middleware/security.js
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');

// Rate limiting configs
const createRateLimiter = (windowMs, max, message) => rateLimit({
  windowMs,
  max,
  message: { error: message },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    res.status(429).json({ error: message, retryAfter: Math.ceil(windowMs / 1000) });
  }
});

const generalLimiter = createRateLimiter(15 * 60 * 1000, 100, 'Too many requests');
const authLimiter = createRateLimiter(15 * 60 * 1000, 5, 'Too many login attempts');
const paymentLimiter = createRateLimiter(60 * 1000, 3, 'Too many payments');
const orderLimiter = createRateLimiter(60 * 1000, 5, 'Too many orders');

const securityHeaders = helmet({
  contentSecurityPolicy: { directives: { defaultSrc: ["'self'"] } },
  crossOriginEmbedderPolicy: false,
  hsts: { maxAge: 31536000, includeSubDomains: true, preload: true },
  noSniff: true,
  xssFilter: true,
  referrerPolicy: { policy: "same-origin" }
});

module.exports = {
  generalLimiter,
  authLimiter,
  paymentLimiter,
  orderLimiter,
  securityHeaders
};
