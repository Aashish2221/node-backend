const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');

// GET cart by user ID
router.get('/:userId', async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.params.userId }).populate('items.product');
    if (!cart) return res.status(404).json({ message: 'Cart not found' });
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST or update cart
router.post('/:userId', async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.params.userId });
    if (cart) {
      // Update existing cart
      cart.items = req.body.items; // Simplified; add logic to merge items
      await cart.save();
      res.json(cart);
    } else {
      // Create new cart
      cart = new Cart({
        user: req.params.userId,
        items: req.body.items,
      });
      const newCart = await cart.save();
      res.status(201).json(newCart);
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;