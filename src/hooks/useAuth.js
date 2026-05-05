import { useState, useEffect, useCallback } from 'react'

const STORAGE_KEY = 'nw_user'

export function useAuth() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) setUser(JSON.parse(stored))
    } catch {
      // corrupted data — ignore
    } finally {
      setLoading(false)
    }
  }, [])

  /**
   * Simulates a login with a small delay to mimic a real API call.
   * Stores { email } in localStorage.
   * Returns a promise so callers can await it and handle errors.
   */
  const login = useCallback(async (email, password) => {
    // Basic validation (mirrors what the modal also checks, but kept here too
    // so the hook stays self-contained and usable from anywhere)
    if (!email || !email.includes('@')) throw new Error('Invalid email address.')
    if (!password || password.trim().length === 0) throw new Error('Password is required.')

    // Simulated async delay (300–500 ms)
    await new Promise(resolve => setTimeout(resolve, 400))

    const userData = { email }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userData))
    setUser(userData)
    return userData
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY)
    setUser(null)
  }, [])

  return { user, loading, login, logout }
}

