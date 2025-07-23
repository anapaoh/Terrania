const express = require('express');
const router = express.Router();
const ProductosController = require('../controllers/productos.controller');

router.get('/productos', ProductosController.listarProductos);



module.exports = router;