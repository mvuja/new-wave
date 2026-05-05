import './_cart.scss'
import Button from '../UI/Button'
import close from '../../Assets/close.svg'
import thousandSeparator from '../../utils/thousandSeparator'
import Card from '../Card/Card'
import useCartStore from '../../store/useCartStore'

const Cart = ({ cartIsOpen, closeCartHandler, onCheckout }) => {
  const { cartItems } = useCartStore()

  const cartTotal = Math.round(
    cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0) * 100
  ) / 100

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <aside id="cart" className={cartIsOpen ? 'open' : undefined}>
      <div className="cart-header">
        <h2>Cart</h2>
        <button className="close-cart" onClick={closeCartHandler}>
          <img src={close} alt="close cart" />
        </button>
      </div>

      <ul className="cart-container">
        {cartItems.length ? (
          cartItems.map((el) => (
            <Card
              key={el.id}
              id={el.id}
              img={el.thumbnail}
              title={el.title}
              price={el.price}
              category={el.category}
              desc={el.description}
              isCart={true}
            />
          ))
        ) : (
          <p className="empty-shop">
            Your cart is empty. Add some products from the shop!
          </p>
        )}
      </ul>

      {cartItems.length > 0 && (
        <div className="cart-footer">
          <p className="cart-total">
            TOTAL: <span>${thousandSeparator(cartTotal)}</span>
          </p>
          <Button onClick={() => onCheckout(cartCount)}>Purchase</Button>
        </div>
      )}
    </aside>
  )
}

export default Cart
