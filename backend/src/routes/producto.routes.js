const express = require("express");
const router = express.Router();

const productoController = require("../controllers/producto.controller");

// POST /productos
router.post("/", productoController.createProducto);

module.exports = router;