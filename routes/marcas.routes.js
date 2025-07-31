const express = require('express');
const router = express.Router();
const MarcasController = require('../controllers/marcas.controller');

router.get('/', MarcasController.listarMarcas); // ahora responde a GET /marcas/

module.exports = router;