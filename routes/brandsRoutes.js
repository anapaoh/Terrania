const express = require('express');
const router = express.Router();
const BrandsController = require('../controllers/BrandsController');

router.get('/', BrandsController.index);

module.exports = router;