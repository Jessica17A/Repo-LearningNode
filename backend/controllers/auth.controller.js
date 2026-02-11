const jwt = require('jsonwebtoken')
const { SECRET, EXPIRES_IN } = require('../config/jwt')

exports.login = (req, res) => {
  const { email } = req.body

  if (!email) return res.status(400).json({ error: 'Email requerido' })

  const user = { email, rol: email.includes('admin') ? 'admin' : 'user' }

  const token = jwt.sign(user, SECRET, { expiresIn: EXPIRES_IN })

  return res.json({ token })
}

exports.perfil = (req, res) => {
  return res.json({ mensaje: 'Ruta protegida ✅', user: req.user })
}
