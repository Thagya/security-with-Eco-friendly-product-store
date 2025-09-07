// routes/order.js
const express = require('express');
const { body, validationResult } = require('express-validator');
const { verifyToken, validateOrder } = require('../middleware'); // correct import
const { User, Order } = require('../models');

const router = express.Router();

// --- Get all orders for the logged-in user ---
router.get('/', verifyToken, async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    const query = { userId: req.user.sub };

    if (status && ['pending','processing','shipped','delivered','cancelled'].includes(status)) {
      query.status = status;
    }

    const orders = await Order.find(query)
      .sort({ createdAt: -1 })
      .limit(Number(limit))
      .skip((page - 1) * limit);

    const total = await Order.countDocuments(query);

    res.json({
      orders,
      totalPages: Math.ceil(total / limit),
      currentPage: Number(page),
      total
    });
  } catch (error) {
    console.error('Orders fetch error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// --- Get single order ---
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const order = await Order.findOne({ _id: req.params.id, userId: req.user.sub });
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json(order);
  } catch (error) {
    console.error('Order fetch error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// --- Create new order ---
router.post('/', verifyToken, validateOrder, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    // Ensure user exists
    let user = await User.findOne({ auth0Id: req.user.sub });
    if (!user) {
      user = new User({
        auth0Id: req.user.sub,
        username: req.user.nickname || req.user.email.split('@')[0],
        name: req.user.name,
        email: req.user.email
      });
      await user.save();
    }

    // Create order
    const order = new Order({
      userId: req.user.sub,
      username: user.username,
      purchaseDate: req.body.purchaseDate,
      deliveryTime: req.body.deliveryTime,
      deliveryLocation: req.body.deliveryLocation,
      productName: req.body.productName,
      quantity: req.body.quantity,
      message: req.body.message || '',
      totalAmount: req.body.totalAmount,
      status: 'pending',
      paymentStatus: 'pending'
    });

    await order.save();
    res.status(201).json(order);
  } catch (error) {
    console.error('Order creation error:', error);
    res.status(error.name === 'ValidationError' ? 400 : 500)
      .json({ error: error.message || 'Internal server error' });
  }
});

// --- Update order ---
router.put('/:id', verifyToken, [
  body('message').optional().isLength({ max: 500 }).escape(),
  body('deliveryTime').optional().isIn(['10 AM','11 AM','12 PM']),
  body('deliveryLocation').optional().isIn([
    "Ampara","Anuradhapura","Badulla","Batticaloa","Colombo",
    "Galle","Gampaha","Hambantota","Jaffna","Kalutara",
    "Kandy","Kegalle","Kilinochchi","Kurunegala","Mannar",
    "Matale","Matara","Monaragala","Mullaitivu","Nuwara Eliya",
    "Polonnaruwa","Puttalam","Ratnapura","Trincomalee","Vavuniya"
  ])
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const order = await Order.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.sub, status: 'pending' },
      { ...req.body, updatedAt: new Date() },
      { new: true, runValidators: true }
    );

    if (!order) return res.status(404).json({ error: 'Order not found or cannot be modified' });
    res.json(order);
  } catch (error) {
    console.error('Order update error:', error);
    res.status(error.name === 'ValidationError' ? 400 : 500)
      .json({ error: error.message || 'Internal server error' });
  }
});

// --- Cancel order ---
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const order = await Order.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.sub, status: { $in: ['pending','processing'] } },
      { status: 'cancelled', updatedAt: new Date() },
      { new: true }
    );

    if (!order) return res.status(404).json({ error: 'Order not found or cannot be cancelled' });
    res.json({ message: 'Order cancelled successfully', order });
  } catch (error) {
    console.error('Order cancellation error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
