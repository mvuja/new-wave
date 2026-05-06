import './_card.scss'
import Button from '../UI/Button'
import trash from '../../Assets/trash.svg'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import thousandSeparator from '../../utils/thousandSeparator'
import useCartStore from '../../store/useCartStore'
import { toProductSlug } from '../../utils/slugify'

const Card = ({ id, img, title, price, category, desc, isCart }) => {
  const { addToCart, removeFromCart, cartItems } = useCartStore()
  const [status, setStatus] = useState('idle') // 'idle' | 'adding' | 'added'

  const cartItem = cartItems.find((item) => item.id === id)
  const quantity = cartItem?.quantity ?? 0
  const slug = toProductSlug(title, id)

  const handleAddToCart = () => {
    if (status !== 'idle') return
    setStatus('adding')
    setTimeout(() => {
      addToCart({ id, thumbnail: img, title, price, category, description: desc })
      setStatus('added')
      setTimeout(() => setStatus('idle'), 1200)
    }, 600)
  }

  return (
    <li className={`${isCart ? 'card in-cart' : 'card'}`}>
      <Link to={`/product/${slug}`} className="card--image-link">
        <img className="card--img" src={img} alt={title} />
      </Link>

      <div className="title-price">
        <Link to={`/product/${slug}`}>
          <h4 className="card--title">{title}</h4>
        </Link>
      </div>

      <p className="card--category">{category}</p>

      <div className="desc-addToCart">
        <p className="card--price">${thousandSeparator(price)}</p>
        {isCart ? (
          <button onClick={() => removeFromCart(id)} className="trash">
            <img src={trash} alt="Remove item" />
          </button>
        ) : (
          <Button
            onClick={handleAddToCart}
            icon={status === 'idle'}
            adding={status === 'adding'}
            added={status === 'added'}
            disabled={status !== 'idle'}
          >
            {status === 'adding' && <span className="spinner spinner--dark" />}
            {status === 'added' && '✓ Added'}
            {status === 'idle' && 'Add to cart'}
          </Button>
        )}
      </div>

      {isCart && quantity > 0 && (
        <span className={`counter ${quantity > 99 ? 'counter-full' : ''}`}>
          {quantity > 99 ? '99+' : quantity}
        </span>
      )}
    </li>
  )
}

export default Card