const express = require('express');
const pedidoController = require('../controllers/pedidoController');
const apiAuth = require('../middleware/apiAuth');
const retornosHttp = require('../middleware/retornosHttp');

const router = express.Router();

router.get('/:id', apiAuth, retornosHttp.paramIsInteger, pedidoController.getPedido);
router.get('/', apiAuth, pedidoController.getPedidos);

module.exports = router;