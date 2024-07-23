const express = require('express');
const retornosHttp = require('../middleware/retornosHttp');
const clienteController = require('../controllers/clienteController');

const router = express.Router();

router.get('/', clienteController.getClientes);
router.get('/:id', retornosHttp.paramIsInteger, clienteController.getCliente);

module.exports = router;