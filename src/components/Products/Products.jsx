import { useEffect, useRef } from 'react'
import useProductStore from '../../store/useProductStore'
import Card from '../Card/Card'
import SkeletonCard from '../UI/SkeletonCard'
import Pagination from '../Pagination/Pagination'
import ProductsToolbar, { SORT_OPTIONS } from '../ProductsToolbar/ProductsToolbar'
import './_products.scss'

import heroImg from '../../Assets/hero-bg.png'

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

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'instant' })
  const handleNext = () => { nextPage(); scrollToTop() }
  const handlePrev = () => { prevPage(); scrollToTop() }

  return (
    <main id="main">
      <div className="hero-bg-container">
        <img src={heroImg} alt="hero background" />
      </div>

      <div className="container">
        <div className="products-heading">
          <h2>Products <span className="products-count">{!loading && total > 0 ? `(${total})` : ''}</span></h2>
        </div>

        <ProductsToolbar currentSortValue={currentSortValue} onSortChange={handleSortChange} />

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