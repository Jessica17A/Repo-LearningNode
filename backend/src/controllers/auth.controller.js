const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { signToken } = require("../config/jwt"); 

exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;

    // 1) Validaciones básicas
    if (!username || !password) {
      return res
        .status(400)
        .json({ ok: false, message: "username y password son requeridos" });
    }

    // 2) Verificar si ya existe el username
    const exists = await User.findOne({ username });
    if (exists) {
      return res
        .status(409)
        .json({ ok: false, message: "Ese username ya está en uso" });
    }

    // 3) Hashear password
    const password_hash = await bcrypt.hash(password, 10);

    // 4) Crear usuario
    const user = await User.create({
      username,
      password_hash,
      role: "user",
    });

    // 5) Crear token (payload mínimo)
    const token = signToken({ id: user._id, role: user.role });

    // 6) Responder (nunca mandes password_hash)
    return res.status(201).json({
      ok: true,
      token,
      user: { id: user._id, username: user.username, role: user.role },
    });
  } catch (err) {
    return res
      .status(500)
      .json({ ok: false, message: "Error en register", error: err.message });
  }
};


exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        ok: false,
        message: "username y password son requeridos",
      });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({
        ok: false,
        message: "Credenciales inválidas",
      });
    }

    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) {
      return res.status(401).json({
        ok: false,
        message: "Credenciales inválidas",
      });
    }

    const token = signToken({ id: user._id, role: user.role });

    return res.json({
      ok: true,
      token,
      user: { id: user._id, username: user.username, role: user.role },
    });
  } catch (err) {
    return res.status(500).json({
      ok: false,
      message: "Error en login",
      error: err.message,
    });
  }
};


exports.me = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select(
      "_id username role"
    );

    if (!user) {
      return res.status(404).json({
        ok: false,
        message: "Usuario no encontrado",
      });
    }

    return res.json({
      ok: true,
      user,
    });
  } catch (err) {
    return res.status(500).json({
      ok: false,
      message: "Error en /me",
      error: err.message,
    });
  }
};