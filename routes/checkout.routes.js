const express = require('express');
const router = express.Router();
const ProductosController = require('../controllers/productos.controller');
const CheckoutController = require('../controllers/checkout.controller'); // ✅ IMPORTA EL CONTROLADOR

// Página de checkout
router.get('/checkout', (req, res) => {
    res.render('checkout');
});

router.post('/crear-payment-intent', CheckoutController.crearPaymentIntent);

module.exports = router;