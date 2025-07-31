const express = require('express');
const router = express.Router();
const HomeController = require('../controllers/home.controller');

router.get('/', HomeController.index);
router.get('/contacto', HomeController.contacto);


module.exports = router;
