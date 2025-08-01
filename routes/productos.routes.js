const express = require('express');
const router = express.Router();
const productosController = require('../controllers/productos.controller');

router.get('/', productosController.listarProductos);
router.get('/marca/:id', productosController.obtenerProductosPorMarca);

module.exports = router;