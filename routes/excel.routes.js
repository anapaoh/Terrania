const express = require('express');
const router = express.Router();
const excelController = require('../controllers/excel.controller');

router.post('/excel-sync', excelController.sincronizarProductoDesdeExcel);

module.exports = router;