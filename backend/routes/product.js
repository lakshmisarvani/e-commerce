const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { auth, admin } = require('../middleware/auth');

// Public
router.get('/products', productController.getAllProducts);
router.get('/:id', productController.getProduct);

// Admin only
router.post('/', auth, admin, productController.createProduct);
router.put('/:id', auth, admin, productController.updateProduct);
router.delete('/:id', auth, admin, productController.deleteProduct);

module.exports = router;