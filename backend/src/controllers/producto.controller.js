const Producto = require("../models/Producto");

// CREAR PRODUCTO
exports.createProducto = async (req, res) => {
  try {
    const nuevoProducto = await Producto.create(req.body);

    return res.status(201).json(nuevoProducto);

  } catch (error) {
    return res.status(500).json({
      message: "Error al crear el producto",
      error: error.message
    });
  }
};