import { useState, useEffect } from 'react'
import './_product-page.scss'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'

import NotFound from '../NotFound/NotFound'
import Button from '../../UI/Button'
import Card from '../../Card/Card'
import thousandSeparator from '../../../utils/thousandSeparator'
import bgImg from '../../../Assets/single-product-bg.png'

import { Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'

import { getProduct, getProductsByCategory } from '../../../api/productsApi'
import useCartStore from '../../../store/useCartStore'
import { idFromSlug } from '../../../utils/slugify'
import SkeletonCard from '../../UI/SkeletonCard'

const ProductPage = () => {
  const { productSlug } = useParams()
  const productID = idFromSlug(productSlug)
  const { addToCart } = useCartStore()

  const [product, setProduct] = useState(null)
  const [similar, setSimilar] = useState([])
  const [similarLoading, setSimilarLoading] = useState(true)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const [counter, setCounter] = useState(1)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setNotFound(false)
    setProduct(null)
    setSimilar([])
    setSimilarLoading(true)
    setCounter(1)

    getProduct(productID)
      .then((data) => {
        if (cancelled) return
        if (!data?.id) { setNotFound(true); setLoading(false); return }
        setProduct(data)
        setLoading(false)
        // Fetch similar products by category (exclude current)
        return getProductsByCategory(data.category, { limit: 4, skip: 0 })
          .then((res) => {
            if (cancelled) return
            setSimilar(res.products.filter((p) => p.id !== data.id).slice(0, 3))
            setSimilarLoading(false)
          })
      })
      .catch(() => {
        if (!cancelled) { setNotFound(true); setLoading(false) }
      })

    return () => { cancelled = true }
  }, [productID])

  const quantityPlus = (e) => {
    e.preventDefault()
    if (counter < 10) setCounter((c) => c + 1)
  }

  const quantityMinus = (e) => {
    e.preventDefault()
    if (counter > 1) setCounter((c) => c - 1)
  }

  const [cartStatus, setCartStatus] = useState('idle') // 'idle' | 'adding' | 'added'

  // ...existing code...

  const handleAddToCart = (e) => {
    e.preventDefault()
    if (cartStatus !== 'idle') return
    setCartStatus('adding')
    setTimeout(() => {
      addToCart(
        { id: product.id, thumbnail: product.thumbnail, title: product.title, price: product.price, category: product.category, description: product.description },
        counter
      )
      setCartStatus('added')
      setTimeout(() => setCartStatus('idle'), 1200)
    }, 600)
  }

  if (notFound) return <NotFound />

  return (
    <section id="single-product">
      <img className="single-product-bg" src={bgImg} alt="graphic" />

      {loading ? (
        <div id="loader">
          <div className="product-page-skeleton">
            <div className="skeleton skeleton-product-img" />
            <div className="product-page-skeleton-content">
              <div className="skeleton skeleton-line lg" />
              <div className="skeleton skeleton-line sm" />
              <div className="skeleton skeleton-line md" />
              <div className="skeleton skeleton-line sm" />
            </div>
          </div>
        </div>
      ) : (
        <div className="container">
          <div className="product-grid">
            <div className="image-holder">
              <Swiper
                modules={[Pagination]}
                pagination={{ clickable: true }}
                loop={true}
                spaceBetween={50}
                slidesPerView={1}
              >
                {product.images?.map((img, i) => (
                  <SwiperSlide key={i}>
                    <img src={img} alt="" />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            <div className="product-content">
              <h2 className="product-title">{product.title}</h2>
              <p className="product-category">{product.category}</p>
              <p className="product-desc">{product.description}</p>
              <p className="product-price">${thousandSeparator(product.price)}</p>

              <form onSubmit={handleAddToCart} className="add-to-cart">
                <div className="quantity-container">
                  <button className="minus" onClick={quantityMinus} disabled={cartStatus !== 'idle'}>-</button>
                  <input className="product-quantity" type="text" value={counter} readOnly />
                  <button className="plus" onClick={quantityPlus} disabled={cartStatus !== 'idle'}>+</button>
                </div>
                <Button
                  type="submit"
                  icon={cartStatus === 'idle'}
                  adding={cartStatus === 'adding'}
                  added={cartStatus === 'added'}
                  disabled={cartStatus !== 'idle'}
                >
                  {cartStatus === 'adding' && <span className="spinner spinner--dark" />}
                  {cartStatus === 'added' && '✓ Added'}
                  {cartStatus === 'idle' && 'Add to cart'}
                </Button>
              </form>
            </div>
          </div>
        </div>
      )}

      <div className="container">
        <div className="similar-products">
          <h3>Similar products</h3>
          <ul className="similar-products-grid">
            {similarLoading
              ? [0, 1, 2].map((i) => <SkeletonCard key={i} />)
              : similar.map((el) => (
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
        </div>
      </div>
    </section>
  )
}

export default ProductPage