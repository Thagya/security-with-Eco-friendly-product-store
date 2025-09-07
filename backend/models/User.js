const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  auth0Id: { 
    type: String, 
    required: true, 
    unique: true,
    index: true 
  },
  username: { 
    type: String, 
    required: true,
    trim: true,
    maxlength: 50
  },
  name: { 
    type: String,
    trim: true,
    maxlength: 100
  },
  email: { 
    type: String, 
    required: true,
    lowercase: true,
    trim: true
  },
  contactNumber: { 
    type: String,
    trim: true,
    validate: {
      validator: v => !v || /^[+]?[\d\s-()]+$/.test(v),
      message: 'Invalid phone number format'
    }
  },
  country: { 
    type: String, 
    default: 'Sri Lanka',
    trim: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastLogin: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true }); // ✅ this already adds createdAt & updatedAt

// Update lastLogin helper
userSchema.methods.updateLastLogin = function() {
  this.lastLogin = new Date();
  return this.save();
};

module.exports = mongoose.model('User', userSchema);
