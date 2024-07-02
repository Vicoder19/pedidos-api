const express = require('express');
const classeController = require('../controllers/classeController.js');
const retornosHttp = require('../middleware/retornosHttp.js');
const apiAuth = require('../middleware/apiAuth.js');

const router = express.Router();

router.get('/', classeController.getClasses);
router.get('/:id', retornosHttp.paramIsInteger, classeController.getClasse);
router.post('/', apiAuth, classeController.createClasse);
router.put('/:id', apiAuth, retornosHttp.paramIsInteger, classeController.updateClasse);
router.delete('/:id', apiAuth, retornosHttp.paramIsInteger, classeController.deleteClasse);

module.exports = router;