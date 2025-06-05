const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { auth, admin } = require('../middleware/auth');
const stripe=require('stripe')(process.env.STRIPE_SECRET_KEY);
const Product=require('../models/Product');
const Order=require('../models/Order');

// User
router.get('/', auth, orderController.getOrders);
router.post('/', auth, orderController.placeOrder);

// Admin
router.get('/all', auth, admin, orderController.getAllOrders);

// Buy Now route (single product, immediate order)
router.post('/buy-now', auth, async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // Create Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'inr',
          product_data: {
            name: product.name,
            images: [product.image]
          },
          unit_amount: product.price * 100,
        },
        quantity,
      }],
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL}/order-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/product/${product._id}`,
      metadata: {
        userId: req.user.id,
        productId: product._id,
        quantity,
      }
    });

    res.json({ sessionUrl: session.url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Stripe error" });
  }
});
module.exports = router;