const express = require("express");
const productController = require('./controllers/productsController');

const router = express.Router();

//Product routes
router.get('/items', productController.GetProducts);
router.get('/items/:id', productController.GetProductDetail);

module.exports = router;