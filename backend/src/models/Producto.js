const mongoose = require("mongoose");

const ProductoSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
    },
    precio: {
      type: Number,
      required: true,
      min: 0,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    categoria: {
      type: String,
      enum: ["Tecnologia", "Ropa", "Hogar", "Otro"],
      default: "Otro",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Producto", ProductoSchema);