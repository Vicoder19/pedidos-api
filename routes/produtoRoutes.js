// routes/productRoutes.js
const express = require('express');
const productController = require('../controllers/produtoController');
const apiAuth = require('../middleware/apiAuth');
const retornosHttp = require('../middleware/retornosHttp');

const router = express.Router();

//função feita para testar autenticação e custom sql
router.get('/custom', apiAuth, productController.getProductByName); 

router.get('/', productController.getProducts);
router.get('/:id', retornosHttp.paramIsInteger, productController.getProduct);
router.post('/', apiAuth, productController.createProduct);
router.put('/:id', apiAuth, retornosHttp.paramIsInteger, productController.updateProduct);
router.delete('/:id', apiAuth, retornosHttp.paramIsInteger, productController.deleteProduct);

module.exports = router;
