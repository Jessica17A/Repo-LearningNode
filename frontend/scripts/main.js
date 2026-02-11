import { login, perfil } from './auth.js'

const out = document.getElementById('out')
const btnLogin = document.getElementById('btnLogin')
const btnPerfil = document.getElementById('btnPerfil')

function mostrar(x) {
  out.textContent = typeof x === 'string' ? x : JSON.stringify(x, null, 2)
}

btnLogin.addEventListener('click', async () => {
  const email = document.getElementById('email').value.trim()
  if (!email) return mostrar('Escribe un email')

  const r = await login(email)
  if (!r.ok) return mostrar(r.data)

  localStorage.setItem('token', r.data.token)
  mostrar('✅ Login OK. Token guardado.')
})

btnPerfil.addEventListener('click', async () => {
  const token = localStorage.getItem('token')
  if (!token) return mostrar('Primero haz login')

  const r = await perfil(token)
  mostrar(r.data)
})
