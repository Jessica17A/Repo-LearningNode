const jwt = require('jsonwebtoken')
const { SECRET } = require('../config/jwt')

exports.verificarToken = (req, res, next) => {
  const token = req.headers.authorization
  if (!token) return res.status(401).json({ error: 'Token requerido' })

  try {
    const user = jwt.verify(token, SECRET)
    req.user = user
    next()
  } catch (e) {
    return res.status(403).json({ error: 'Token inválido o expirado' })
  }
}
