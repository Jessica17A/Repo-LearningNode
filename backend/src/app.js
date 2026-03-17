const express = require("express");
const cors = require("cors");
const path = require("path");

const authRoutes = require("./routes/auth.routes");
const productoRoutes = require("./routes/producto.routes");

const app = express();

app.use(cors());
app.use(express.json());


app.use(express.static(path.join(__dirname, "../../frontend")));

// Rutas
app.use("/auth", authRoutes);
app.use("/productos", productoRoutes);

module.exports = app;