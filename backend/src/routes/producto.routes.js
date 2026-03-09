const express = require("express");
const router = express.Router();

const productoController = require("../controllers/producto.controller");

// Buscar productos
router.get("/", productoController.obtenerProductos);

// Crear producto
router.post("/", productoController.crearProducto);

module.exports = router;