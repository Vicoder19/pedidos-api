const express = require('express');
const ClasseController = require('../controllers/classeController.js');
const retornosHttp = require('../middleware/retornosHttp.js');
const apiAuth = require('../middleware/apiAuth.js');

const router = express.Router();

router.get('/', ClasseController.getClasses);
router.get('/:id', retornosHttp.paramIsInteger, ClasseController.getClasse);
router.delete('/:id', apiAuth, retornosHttp.paramIsInteger, ClasseController.deleteClasse);

module.exports = router;