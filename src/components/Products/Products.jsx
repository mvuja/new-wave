import { useEffect, useRef } from 'react'
import useProductStore from '../../store/useProductStore'
import Card from '../Card/Card'
import SkeletonCard from '../UI/SkeletonCard'
import Pagination from '../Pagination/Pagination'
import Search from '../Search/Search'
import FilterDropdown from '../FilterDropdown/FilterDropdown'
import './_products.scss'

import heroImg from '../../Assets/hero-bg.png'

// Sort options available to the user
const SORT_OPTIONS = [
  { label: 'Title A–Z',       sortBy: 'title', order: 'asc' },
  { label: 'Title Z–A',       sortBy: 'title', order: 'desc' },
  { label: 'Price Low–High',  sortBy: 'price', order: 'asc' },
  { label: 'Price High–Low',  sortBy: 'price', order: 'desc' },
  { label: 'Rating',          sortBy: 'rating', order: 'desc' },
]

const Products = () => {
  const {
    products, total, page, limit, loading, error,
    sortBy, order,
    fetchProducts,
    nextPage, prevPage,
    setSort,
  } = useProductStore()

  const initialized = useRef(false)
  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true
      fetchProducts()
    }
  }, [fetchProducts])

  const currentSortValue = `${sortBy}_${order}`

  const handleSortChange = (e) => {
    const opt = SORT_OPTIONS.find((o) => `${o.sortBy}_${o.order}` === e.target.value)
    if (opt) setSort(opt.sortBy, opt.order)
  }


  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  const handleNext = () => { nextPage(); scrollToTop() }
  const handlePrev = () => { prevPage(); scrollToTop() }

  return (
    <main id="main">
      <div className="hero-bg-container">
        <img src={heroImg} alt="hero background" />
      </div>

      <div className="container">
        <div className="products-heading">
          <h2>Products</h2>
          <Search />
          <FilterDropdown />
          <div className="dropdown">
            <select value={currentSortValue} onChange={handleSortChange}>
              {SORT_OPTIONS.map((o) => (
                <option key={`${o.sortBy}_${o.order}`} value={`${o.sortBy}_${o.order}`}>
                  {o.label}
                </option>
              ))}
            </select>
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000">
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
            </svg>
          </div>
        </div>

        {error && (
          <div className="state-message error-state">
            <p>⚠️ {error}</p>
            <button onClick={fetchProducts}>Retry</button>
          </div>
        )}

        {loading ? (
          <ul className="product-list">
            {Array.from({ length: limit }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </ul>
        ) : !error && products.length === 0 ? (
          <div className="state-message empty-state">
            <p>No products found. Try a different search or category.</p>
          </div>
        ) : (
          <ul className="product-list">
            {products.map((el) => (
              <Card
                key={el.id}
                id={el.id}
                img={el.thumbnail}
                title={el.title}
                price={el.price}
                category={el.category}
                desc={el.description}
                isCart={false}
              />
            ))}
          </ul>
        )}

        <Pagination
          page={page}
          limit={limit}
          total={total}
          onNext={handleNext}
          onPrev={handlePrev}
        />
      </div>
    </main>
  )
}

export default Products