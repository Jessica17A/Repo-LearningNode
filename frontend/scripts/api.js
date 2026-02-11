export const API = 'http://localhost:3000/api'

export async function postJSON(url, body) {
  const resp = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  })
  const data = await resp.json()
  return { ok: resp.ok, data }
}

export async function getAuth(url, token) {
  const resp = await fetch(url, {
    headers: { Authorization: token }
  })
  const data = await resp.json()
  return { ok: resp.ok, data }
}
