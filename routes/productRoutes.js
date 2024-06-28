// routes/productRoutes.js
const express = require('express');
const productController = require('../controllers/productController');
const apiAuth = require('../middleware/apiAuth');

const router = express.Router();

router.get('/custom', apiAuth, productController.getProductByName);
router.get('/', productController.getProducts);
router.get('/:id', productController.getProduct);
router.post('/', productController.createProduct);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;
