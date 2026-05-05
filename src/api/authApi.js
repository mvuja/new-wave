const BASE = 'https://dummyjson.com'

export const loginApi = async (username, password) => {
  const res = await fetch(`${BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password, expiresInMins: 60 }),
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.message || 'Invalid credentials. Please try again.')
  }

  return res.json()
}

export const fetchMeApi = async (token) => {
  const res = await fetch(`${BASE}/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  })

  if (!res.ok) throw new Error('Session expired')
  return res.json()
}

