import './_cart.scss'
import Button from '../UI/Button'
import close from '../../Assets/close.svg'

import thousandSeparator from '../../thousandSeparator'

import Card from '../Card/Card'

const Cart = ({ cart, cartIsOpen, setCartHandler, cartPrice, checkoutHandler, closeCartHadnler }) => {


    return ( 
        <aside id="cart" className={`${cartIsOpen && 'open'}`}>
            <div className="cart-header">
                <h2>Cart</h2>
                <button className='close-cart' onClick={closeCartHadnler}>
                    <img src={close} alt="close cart" />
                </button>
            </div>
            <ul className="cart-container">
                {
                    cart.length ?
                    cart?.map( el => (
                        <Card key={el.id} id={el.id} img={el.thumbnail} title={el.title} price={el.price} category={el.category} desc={el.description} isCart={true} setCartHandler={setCartHandler} cart={cart} counter={el.counter} />
                    ))
                    :
                    <p className='empty-shop'>Currently, there are no products in the cart. Please choose some of the products from the shop!</p>
                }
            </ul>

            {
                cart.length > 0 &&
                <div className="cart-footer">
                    <p className='cart-total'>TOTAL: <span>${thousandSeparator(cartPrice)}</span></p>
                    <Button onClick={checkoutHandler}>Purchase</Button>
                </div>
            }

        </aside>
     )
}
 
export default Cart;