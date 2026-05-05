import { create } from 'zustand'
import {
  getProducts,
  searchProducts,
  getCategories,
  getProductsByCategory,
} from '../api/productsApi'

const LIMIT = 12

const useProductStore = create((set, get) => ({
  products: [],
  total: 0,
  page: 1,
  limit: LIMIT,
  loading: false,
  error: null,

  categories: [],
  searchQuery: '',
  selectedCategory: '',
  sortBy: 'title',
  order: 'asc',

  fetchProducts: async () => {
    const { page, limit, searchQuery, selectedCategory, sortBy, order } = get()
    const skip = (page - 1) * limit
    set({ loading: true, error: null })

    try {
      let data
      if (searchQuery) {
        data = await searchProducts(searchQuery, { limit, skip, sortBy, order })
      } else if (selectedCategory) {
        data = await getProductsByCategory(selectedCategory, { limit, skip, sortBy, order })
      } else {
        data = await getProducts({ limit, skip, sortBy, order })
      }
      set({ products: data.products, total: data.total, loading: false })
    } catch (err) {
      set({ error: err.message, loading: false, products: [] })
    }
  },

  fetchCategories: async () => {
    try {
      const data = await getCategories()
      // DummyJSON returns [{ slug, name, url }, ...]
      set({ categories: data })
    } catch {
      set({ categories: [] })
    }
  },

  // Set search + reset page, then fetch
  setSearch: (query) => {
    set({ searchQuery: query, selectedCategory: '', page: 1 })
    get().fetchProducts()
  },

  // Set category + reset page, then fetch
  setCategory: (slug) => {
    set({ selectedCategory: slug, searchQuery: '', page: 1 })
    get().fetchProducts()
  },

  // Set sort + reset page, then fetch
  setSort: (sortBy, order) => {
    set({ sortBy, order, page: 1 })
    get().fetchProducts()
  },

  nextPage: () => {
    const { page, limit, total } = get()
    if (page * limit < total) {
      set((state) => ({ page: state.page + 1 }))
      get().fetchProducts()
    }
  },

  prevPage: () => {
    if (get().page > 1) {
      set((state) => ({ page: state.page - 1 }))
      get().fetchProducts()
    }
  },

  setPage: (page) => {
    set({ page })
    get().fetchProducts()
  },
}))

export default useProductStore

