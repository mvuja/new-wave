import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useCartStore = create(
  persist(
    (set, get) => ({
      cartItems: [],

      addToCart: (product, quantity = 1) => {
        set((state) => {
          const idx = state.cartItems.findIndex((item) => item.id === product.id)
          if (idx > -1) {
            const updated = [...state.cartItems]
            updated[idx] = { ...updated[idx], quantity: updated[idx].quantity + quantity }
            return { cartItems: updated }
          }
          return { cartItems: [...state.cartItems, { ...product, quantity }] }
        })
      },

      removeFromCart: (id) =>
        set((state) => ({
          cartItems: state.cartItems.filter((item) => item.id !== id),
        })),

      updateQuantity: (id, qty) =>
        set((state) => ({
          cartItems:
            qty <= 0
              ? state.cartItems.filter((item) => item.id !== id)
              : state.cartItems.map((item) =>
                  item.id === id ? { ...item, quantity: qty } : item
                ),
        })),

      clearCart: () => set({ cartItems: [] }),

      // Non-reactive helpers — read directly from state
      getCartCount: () =>
        get().cartItems.reduce((sum, item) => sum + item.quantity, 0),

      getCartTotal: () =>
        Math.round(
          get().cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0) * 100
        ) / 100,
    }),
    { name: 'nw_cart' }
  )
)

export default useCartStore

