const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const productoRoutes = require("./routes/producto.routes");

const app = express();

app.use(cors());
app.use(express.json());

//Rutas del Login 
app.use("/auth", authRoutes);
app.use("/productos", productoRoutes);

module.exports = app;
