const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { 
    type: String, 
    required: true,
    index: true
  },
  username: { 
    type: String, 
    required: true,
    trim: true
  },
  purchaseDate: { 
    type: Date, 
    required: true,
    validate: {
      validator: function(v) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return v >= today && v.getDay() !== 0; // Not in past and not Sunday
      },
      message: 'Invalid purchase date'
    }
  },
  deliveryTime: { 
    type: String, 
    required: true,
    enum: {
      values: ['10 AM', '11 AM', '12 PM'],
      message: 'Invalid delivery time'
    }
  },
  deliveryLocation: { 
    type: String, 
    required: true,
    enum: {
      values: [
        "Ampara", "Anuradhapura", "Badulla", "Batticaloa", "Colombo",
        "Galle", "Gampaha", "Hambantota", "Jaffna", "Kalutara",
        "Kandy", "Kegalle", "Kilinochchi", "Kurunegala", "Mannar",
        "Matale", "Matara", "Monaragala", "Mullaitivu", "Nuwara Eliya",
        "Polonnaruwa", "Puttalam", "Ratnapura", "Trincomalee", "Vavuniya"
      ],
      message: 'Invalid delivery location'
    }
  },
  productName: { 
    type: String, 
    required: true,
    enum: {
      values: [
        "Rolex Submariner", "Omega Speedmaster", "Tag Heuer Formula 1",
        "Seiko Prospex", "Casio G-Shock", "Apple Watch Series 9"
      ],
      message: 'Invalid product name'
    }
  },
  quantity: { 
    type: Number, 
    required: true, 
    min: [1, 'Quantity must be at least 1'], 
    max: [10, 'Quantity cannot exceed 10'],
    validate: {
      validator: Number.isInteger,
      message: 'Quantity must be a whole number'
    }
  },
  message: { 
    type: String,
    trim: true,
    maxlength: [500, 'Message cannot exceed 500 characters']
  },
  totalAmount: { 
    type: Number, 
    required: true,
    min: [0, 'Total amount must be positive']
  },
  status: { 
    type: String, 
    default: 'pending',
    enum: {
      values: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
      message: 'Invalid order status'
    }
  },
  paymentStatus: {
    type: String,
    default: 'pending',
    enum: {
      values: ['pending', 'completed', 'failed', 'refunded'],
      message: 'Invalid payment status'
    }
  },
  paymentIntentId: {
    type: String,
    sparse: true
  },
  trackingNumber: {
    type: String,
    sparse: true
  },
  deliveryAddress: {
    street: String,
    city: String,
    postalCode: String,
    district: String
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Indexes for better performance
orderSchema.index({ userId: 1, createdAt: -1 });
orderSchema.index({ status: 1 });
orderSchema.index({ paymentStatus: 1 });

// Virtual for order number
orderSchema.virtual('orderNumber').get(function() {
  return `WS${this._id.toString().slice(-8).toUpperCase()}`;
});

// Instance methods
orderSchema.methods.updateStatus = function(newStatus) {
  this.status = newStatus;
  this.updatedAt = new Date();
  return this.save();
};

orderSchema.methods.updatePaymentStatus = function(newStatus, paymentIntentId = null) {
  this.paymentStatus = newStatus;
  if (paymentIntentId) {
    this.paymentIntentId = paymentIntentId;
  }
  this.updatedAt = new Date();
  return this.save();
};

module.exports = mongoose.model('Order', orderSchema);
