const express = require('express');
const pedidoController = require('../controllers/pedidoController');
const retornosHttp = require('../middleware/retornosHttp');

const router = express.Router();

router.get('/:id', retornosHttp.paramIsInteger, pedidoController.getPedido);
router.get('/', pedidoController.getPedidos);

module.exports = router;