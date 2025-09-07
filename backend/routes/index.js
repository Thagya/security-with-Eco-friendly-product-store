const express = require('express');
const authRoutes = require('./auth');
const orderRoutes = require('./order');
const productRoutes = require('./product');
const paymentRoutes = require('./payment');

const router = express.Router();

// Health check
router.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    service: 'WatchStore API'
  });
});

// Districts endpoint
router.get('/districts', (req, res) => {
  const districts = [
    "Ampara", "Anuradhapura", "Badulla", "Batticaloa", "Colombo",
    "Galle", "Gampaha", "Hambantota", "Jaffna", "Kalutara",
    "Kandy", "Kegalle", "Kilinochchi", "Kurunegala", "Mannar",
    "Matale", "Matara", "Monaragala", "Mullaitivu", "Nuwara Eliya",
    "Polonnaruwa", "Puttalam", "Ratnapura", "Trincomalee", "Vavuniya"
  ];
  
  res.json(districts);
});

// Mount routes
router.use('/user', authRoutes);
router.use('/orders', orderRoutes);
router.use('/products', productRoutes);
router.use('/payment', paymentRoutes);

module.exports = router;