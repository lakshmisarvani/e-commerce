const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));
const productRoutes = require('./routes/product');
const cartRoutes = require('./routes/cart');
const orderRoutes = require('./routes/order');
const authRoutes=require('./routes/auth');

app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/auth',authRoutes);

// TODO: Add routes here

app.get('/', (req, res) => res.send('API Running'));

mongoose.connect(process.env.MONGO_URI)
  .then(() => app.listen(5000, () => console.log('Server started on port 5000')))
  .catch(err => console.log(err));