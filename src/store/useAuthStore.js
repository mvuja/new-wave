import { create } from 'zustand'
import { loginApi } from '../api/authApi'

const STORAGE_KEY = 'nw_auth'

const loadSaved = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || null
  } catch {
    return null
  }
}

const useAuthStore = create((set) => ({
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  loading: false,
  error: null,

  // Call once on app mount to restore session from localStorage
  init: () => {
    const saved = loadSaved()
    if (saved?.accessToken) {
      set({
        user: saved.user,
        accessToken: saved.accessToken,
        refreshToken: saved.refreshToken,
        isAuthenticated: true,
      })
    }
  },

  login: async (username, password) => {
    set({ loading: true, error: null })
    try {
      const data = await loginApi(username, password)
      const authData = {
        user: {
          id: data.id,
          username: data.username,
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          image: data.image,
        },
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(authData))
      set({ ...authData, isAuthenticated: true, loading: false, error: null })
    } catch (err) {
      set({ loading: false, error: err.message })
      throw err
    }
  },

  logout: () => {
    localStorage.removeItem(STORAGE_KEY)
    set({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      error: null,
    })
  },

  clearError: () => set({ error: null }),
}))

export default useAuthStore

