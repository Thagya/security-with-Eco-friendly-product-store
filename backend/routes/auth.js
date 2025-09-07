const express = require('express');
const { verifyToken } = require('../middleware/auth');
const { User } = require('../models');
const router = express.Router();

// Get user profile
router.get('/profile', verifyToken, async (req, res) => {
  try {
    let user = await User.findOne({ auth0Id: req.user.sub });
    
    if (!user) {
      // Create user if doesn't exist
      user = new User({
        auth0Id: req.user.sub,
        username: req.user.nickname || req.user.email.split('@')[0],
        name: req.user.name,
        email: req.user.email,
        contactNumber: req.user.phone_number,
        country: 'Sri Lanka'
      });
      await user.save();
    } else {
      // Update last login
      await user.updateLastLogin();
    }
    
    res.json(user);
  } catch (error) {
    console.error('Profile fetch error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update user profile
router.put('/profile', verifyToken, async (req, res) => {
  try {
    const { contactNumber, country } = req.body;
    
    const user = await User.findOneAndUpdate(
      { auth0Id: req.user.sub },
      { 
        contactNumber,
        country,
        updatedAt: new Date()
      },
      { new: true, runValidators: true }
    );
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    console.error('Profile update error:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;