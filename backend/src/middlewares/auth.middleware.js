const { verifyToken } = require("../config/jwt");

function authRequired(req, res, next) {
  const header = req.headers.authorization || "";
  const [type, token] = header.split(" ");

  if (type !== "Bearer" || !token) {
    return res.status(401).json({ ok: false, message: "Token requerido." });
  }

  try {
    const payload = verifyToken(token);
    req.user = payload; // { id, username, role }
    next();
  } catch (e) {
    return res.status(401).json({ ok: false, message: "Token inválido o expirado." });
  }
}

module.exports = { authRequired };
