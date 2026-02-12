const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { signToken } = require("../config/jwt");

async function register(req, res) {
  try {
    const { username, password } = req.body;

    if (!username || !password || password.length < 6) {
      return res.status(400).json({
        ok: false,
        message: "username y password mínimo 6 caracteres.",
      });
    }

    const existing = await User.findOne({ username });
    if (existing) {
      return res.status(409).json({ ok: false, message: "Usuario ya existe." });
    }

    const password_hash = bcrypt.hashSync(password, 10);

    const user = await User.create({
      username,
      password_hash,
    });

    const safeUser = {
      id: user._id,
      username: user.username,
      role: user.role,
    };

    const token = signToken(safeUser);

    return res.status(201).json({
      ok: true,
      message: "Usuario creado",
      data: { token, user: safeUser },
    });
  } catch (err) {
    return res.status(500).json({ ok: false, message: err.message });
  }
}

async function login(req, res) {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ ok: false, message: "Credenciales inválidas." });
    }

    const ok = bcrypt.compareSync(password, user.password_hash);
    if (!ok) {
      return res.status(401).json({ ok: false, message: "Credenciales inválidas." });
    }

    const safeUser = {
      id: user._id,
      username: user.username,
      role: user.role,
    };

    const token = signToken(safeUser);

    return res.json({
      ok: true,
      message: "Login OK",
      data: { token, user: safeUser },
    });
  } catch (err) {
    return res.status(500).json({ ok: false, message: err.message });
  }
}

function me(req, res) {
  return res.json({ ok: true, data: { user: req.user } });
}

module.exports = { register, login, me };
