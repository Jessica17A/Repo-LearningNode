import { API, postJSON, getAuth } from './api.js'

export async function login(email) {
  return postJSON(`${API}/login`, { email })
}

export async function perfil(token) {
  return getAuth(`${API}/perfil`, token)
}
