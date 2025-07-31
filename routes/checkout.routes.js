const express = require('express');
const router = express.Router();
const checkoutController = require('../controllers/checkout.controller');

router.post('/crear-payment-intent', checkoutController.crearPaymentIntent);
router.post('/crear-pedido-paypal', checkoutController.crearPedidoPayPal);

module.exports = router;