const express = require('express');
const productController = require('../controllers/produtoController');
const retornosHttp = require('../middleware/retornosHttp');

const router = express.Router();

//função feita para testar autenticação e custom sql
router.get('/custom', productController.getProductByName); 

router.get('/', productController.getProdutos);
router.get('/:id', retornosHttp.paramIsInteger, productController.getProduto);
router.post('/', productController.createProduto);
router.put('/:id', retornosHttp.paramIsInteger, productController.updateProduto);
router.delete('/:id', retornosHttp.paramIsInteger, productController.deleteProduto);

module.exports = router;
