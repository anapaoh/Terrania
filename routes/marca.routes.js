const express = require('express');
const router = express.Router();
const marcaController = require('../controllers/marca.controller');

router.get('/', marcaController.listarMarcas);
router.get('/productos/marca/:id', marcaController.obtenerProductosPorMarca);


module.exports = router;