const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    quantity: { type: Number, required: true }
    // Optionally: add product snapshot here for historical accuracy
  }],
  totalAmount: { type: Number, required: true },
  paymentStatus: { type: String, enum: ['pending', 'paid', 'failed'], default: 'pending' },
  paymentId: { type: String },
  shippingAddress: { type: String },
  // You can add brand/category/rating for reporting or denormalization if needed, but best practice is to reference Product
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);