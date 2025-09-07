const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: [0, 'Price must be positive']
  },
  description: {
    type: String,
    required: true,
    maxlength: 500
  },
  image: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['luxury', 'sports', 'casual', 'smart']
  },
  brand: {
    type: String,
    required: true
  },
  inStock: {
    type: Boolean,
    default: true
  },
  stockQuantity: {
    type: Number,
    default: 100,
    min: 0
  },
  features: [String],
  specifications: {
    waterResistance: String,
    material: String,
    movement: String,
    warranty: String
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 4.5
  },
  reviewCount: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
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

// Static method to get available products
productSchema.statics.getAvailableProducts = function() {
  return this.find({ isActive: true, inStock: true });
};

module.exports = mongoose.model('Product', productSchema);
