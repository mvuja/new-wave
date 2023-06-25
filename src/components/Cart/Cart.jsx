import './_cart.scss'
import Button from '../UI/Button';
import trash from '../../Assets/trash.svg'
import close from '../../Assets/close.svg'

const Cart = ({ cart, cartIsOpen, setCartHandler, cartPrice, checkoutHandler, closeCartHadnler }) => {



    const setNewCartHadnler = id => {
        setCartHandler(
            cart.filter(el => (
                el.id !== id
            ))
        )
    }


    return ( 
        <aside id="cart" className={`${cartIsOpen && 'open'}`}>
            <div className="cart-header">
                <h2>Cart</h2>
                <button className='close-cart' onClick={closeCartHadnler}>
                    <img src={close} alt="close cart" />
                </button>
            </div>
            <div className="cart-container">
                {
                    cart.length ?
                    cart?.map( el => (
                        <article key={el.id}>
                            <div className="content">

                                <img className='item-img' src={el.thumbnail} alt={el.title} />
                                <h3 className='item-title'>{el.title}</h3>
                                <p className='item-desc'>{el.desc}</p>
                                <p className='item-price'>${el.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
                            </div>
                            <button onClick={() => {setNewCartHadnler(el.id)}} className='trash'>
                                <img src={trash} alt="Trash item" />
                            </button>
                            {
                                el.counter !== 0 && el.counter <= 99
                                ?
                                <span className='counter'>{el.counter}</span>
                                :
                                el.counter > 99
                                ?
                                <span className='counter counter-full'>99+</span>
                                :
                                <span></span>
                            }
                        </article>
                    ))
                    :
                    <p className='empty-shop'>Currently, there are no products in the cart. Please choose some of the products from the shop!</p>
                }
            </div>

            {
                cart.length > 0 &&
                <div className="cart-footer">
                    <p className='cart-total'>TOTAL: <span>${cartPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span></p>
                    <Button onClick={checkoutHandler}>Purchase</Button>
                </div>
            }

        </aside>
     )
}
 
export default Cart;