const Order = require('../models/Order');
const Cart = require('../models/Cart');

// Get user's orders
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).populate('items.product');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Place order (after successful payment)
exports.placeOrder = async (req, res) => {
  const { items, totalAmount, shippingAddress, paymentId } = req.body;
  try {
    const order = await Order.create({
      user: req.user.id,
      items,
      totalAmount,
      shippingAddress,
      paymentStatus: 'paid',
      paymentId
    });
    // Optionally, clear user's cart
    await Cart.findOneAndDelete({ user: req.user.id });
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Admin: get all orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('items.product user');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};