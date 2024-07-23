const express = require('express');
const classeController = require('../controllers/classeController.js');
const retornosHttp = require('../middleware/retornosHttp.js');

const router = express.Router();

router.get('/', classeController.getClasses);
router.get('/:id', retornosHttp.paramIsInteger, classeController.getClasse);
router.post('/', classeController.createClasse);
router.put('/:id', retornosHttp.paramIsInteger, classeController.updateClasse);
router.delete('/:id', retornosHttp.paramIsInteger, classeController.deleteClasse);

module.exports = router;