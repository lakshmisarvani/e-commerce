const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Order = require('../models/Order');
const bodyParser = require('body-parser');

router.post('/webhook', bodyParser.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    // Extract metadata and store order
    await Order.create({
      user: session.metadata.userId,
      items: [{
        product: session.metadata.productId,
        quantity: session.metadata.quantity
      }],
      totalAmount: session.amount_total / 100,
      paymentStatus: 'paid',
      paymentId: session.id
    });
  }
  res.json({ received: true });
});

module.exports = router;