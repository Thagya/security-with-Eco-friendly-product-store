const { body, param } = require('express-validator');
const mongoose = require('mongoose');

const validateOrder = [
  body('purchaseDate')
    .isISO8601()
    .toDate()
    .custom((value) => {
      const date = new Date(value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (date < today) {
        throw new Error('Purchase date cannot be in the past');
      }
      
      if (date.getDay() === 0) {
        throw new Error('Sunday delivery is not available');
      }
      
      return true;
    }),
  
  body('deliveryTime')
    .isIn(['10 AM', '11 AM', '12 PM'])
    .withMessage('Invalid delivery time'),
  
  body('deliveryLocation')
    .isIn([
      "Ampara", "Anuradhapura", "Badulla", "Batticaloa", "Colombo",
      "Galle", "Gampaha", "Hambantota", "Jaffna", "Kalutara",
      "Kandy", "Kegalle", "Kilinochchi", "Kurunegala", "Mannar",
      "Matale", "Matara", "Monaragala", "Mullaitivu", "Nuwara Eliya",
      "Polonnaruwa", "Puttalam", "Ratnapura", "Trincomalee", "Vavuniya"
    ])
    .withMessage('Invalid delivery location'),
  
  body('productName')
    .isIn([
      "Rolex Submariner", "Omega Speedmaster", "Tag Heuer Formula 1",
      "Seiko Prospex", "Casio G-Shock", "Apple Watch Series 9"
    ])
    .withMessage('Invalid product name'),
  
  body('quantity')
    .isInt({ min: 1, max: 10 })
    .withMessage('Quantity must be between 1 and 10'),
  
  body('totalAmount')
    .isFloat({ min: 0 })
    .withMessage('Total amount must be a positive number'),
  
  body('message')
    .optional()
    .isLength({ max: 500 })
    .withMessage('Message cannot exceed 500 characters')
    .escape(), // XSS protection
  
  body('username')
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage('Username is required and cannot exceed 50 characters')
    .escape()
];

const validateObjectId = param('id').custom((value) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    throw new Error('Invalid ID format');
  }
  return true;
});

const validateUserProfile = [
  body('contactNumber')
    .optional()
    .matches(/^[+]?[\d\s-()]+$/)
    .withMessage('Invalid phone number format')
    .isLength({ max: 20 })
    .withMessage('Phone number too long'),
  
  body('country')
    .optional()
    .isLength({ min: 2, max: 50 })
    .withMessage('Country name must be between 2 and 50 characters')
    .escape()
];

const validatePayment = [
  body('orderId')
    .custom((value) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        throw new Error('Invalid order ID format');
      }
      return true;
    }),
  
  body('paymentIntentId')
    .optional()
    .isString()
    .isLength({ min: 10, max: 100 })
    .withMessage('Invalid payment intent ID')
];

module.exports = {
  validateOrder,
  validateObjectId,
  validateUserProfile,
  validatePayment
};

