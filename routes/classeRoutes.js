const express = require('express');
const ClasseController = require('../controllers/classeController.js');

const router = express.Router();

router.get('/', ClasseController.getClasses);

module.exports = router;