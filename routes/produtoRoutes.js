// routes/productRoutes.js
const express = require('express');
const productController = require('../controllers/produtoController');
const apiAuth = require('../middleware/apiAuth');
const retornosHttp = require('../middleware/retornosHttp');

const router = express.Router();

//função feita para testar autenticação e custom sql
router.get('/custom', apiAuth, productController.getProductByName); 

router.get('/', productController.getProdutos);
router.get('/:id', retornosHttp.paramIsInteger, productController.getProduto);
router.post('/', apiAuth, productController.createProduto);
router.put('/:id', apiAuth, retornosHttp.paramIsInteger, productController.updateProduto);
router.delete('/:id', apiAuth, retornosHttp.paramIsInteger, productController.deleteProduto);

module.exports = router;
