const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String },
  price: { type: Number, required: true },
  image: { type: String }, // URL or path to product image
  stock: { type: Number, default: 0 },
  category: { type: String },
  brand: { type: String, trim: true }, // Brand of the product
  rating: { type: Number, min: 0, max: 5, default: 0 }, // Average rating (0-5)
  // You can add a reviews array for detailed reviews if needed
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);