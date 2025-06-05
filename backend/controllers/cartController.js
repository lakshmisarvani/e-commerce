const Cart = require('../models/Cart');
const Product = require('../models/Product');

// Get user's cart
exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate('items.product');
    res.json(cart || { user: req.user.id, items: [] });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add to cart
exports.addToCart = async (req, res) => {
  const { productId, quantity = 1 } = req.body;
  try {
    let cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      cart = await Cart.create({ user: req.user.id, items: [{ product: productId, quantity }] });
    } else {
      const itemIndex = cart.items.findIndex(i => i.product.toString() === productId);
      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({ product: productId, quantity });
      }
      await cart.save();
    }
    res.json(await cart.populate('items.product'));
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Remove from cart
exports.removeFromCart = async (req, res) => {
  const { productId } = req.body;
  try {
    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });
    cart.items = cart.items.filter(i => i.product.toString() !== productId);
    await cart.save();
    res.json(await cart.populate('items.product'));
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update quantity
exports.updateQuantity = async (req, res) => {
  const { productId, quantity } = req.body;
  try {
    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });
    const item = cart.items.find(i => i.product.toString() === productId);
    if (!item) return res.status(404).json({ message: 'Product not in cart' });
    item.quantity = quantity;
    await cart.save();
    res.json(await cart.populate('items.product'));
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};