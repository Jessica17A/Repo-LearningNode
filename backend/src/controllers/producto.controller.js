const Producto = require("../models/Producto");

// Buscar productos
const obtenerProductos = async (req, res) => {
  try {

    const productos = await Producto.find();

    res.json(productos);

  } catch (error) {

    res.status(500).json({ mensaje: "Error al obtener productos" });

  }
};

// Crear producto
const crearProducto = async (req, res) => {
  try {

    const nuevoProducto = new Producto(req.body);

    const productoGuardado = await nuevoProducto.save();

    res.status(201).json(productoGuardado);

  } catch (error) {

    res.status(400).json({ mensaje: "Error al crear producto" });

  }
};

module.exports = {
  obtenerProductos,
  crearProducto
};