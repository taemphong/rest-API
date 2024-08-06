const express = require('express');
const router = express.Router();
const customerControllerv2 = require('../controllers/customersv2');
const productController = require('../controllers/productsv2');

router.get('/customers/q/:term', customerControllerv2.getCustomersByTerm);

router.get('/products/q/:term', productController.getProductsByTerm);

module.exports = router;


