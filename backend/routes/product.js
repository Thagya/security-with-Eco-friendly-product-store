const express = require('express');
const { Product } = require('../models');
const router = express.Router();

// Get all products
router.get('/', async (req, res) => {
  try {
    const { category, inStock, search } = req.query;
    const query = { isActive: true };
    
    if (category) {
      query.category = category;
    }
    
    if (inStock === 'true') {
      query.inStock = true;
    }
    
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { brand: { $regex: search, $options: 'i' } }
      ];
    }
    
    const products = await Product.find(query).sort({ createdAt: -1 });
    
    res.json(products);
  } catch (error) {
    console.error('Products fetch error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get single product
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id, isActive: true });
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    res.json(product);
  } catch (error) {
    console.error('Product fetch error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;