const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// GET orders by user ID
router.get('/:userId', async (req, res) => {
  try {
    const orders = await Order.find({ user: req.params.userId }).populate('items.product');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new order
router.post('/', async (req, res) => {
  const order = new Order({
    user: req.body.userId,
    items: req.body.items,
    totalPrice: req.body.totalPrice,
    shippingAddress: req.body.shippingAddress,
  });
  try {
    const newOrder = await order.save();
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;