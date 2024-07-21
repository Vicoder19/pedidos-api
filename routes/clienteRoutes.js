const express = require('express');
const retornosHttp = require('../middleware/retornosHttp');
const clienteController = require('../controllers/clienteController');
const apiAuth = require('../middleware/apiAuth');
const { route } = require('./userRoutes');
const models = require('../models');

const router = express.Router();

router.get('/', apiAuth, clienteController.getClientes);
router.get('/:id', apiAuth, retornosHttp.paramIsInteger, clienteController.getCliente);

module.exports = router;