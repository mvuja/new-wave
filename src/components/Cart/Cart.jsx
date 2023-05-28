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

                                <img className='item-img' src={el.image} alt={el.title} />
                                <p className='item-title'>{el.title}</p>
                                <p className='item-desc'>{el.desc}</p>
                                <p className='item-price'>${el.price}</p>
                            </div>
                            <button onClick={() => {setNewCartHadnler(el.id)}} className='trash'>
                                <img src={trash} alt="Trash item" />
                            </button>
                            {/* <p className="counter">{el.counter}</p> */}
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
                    <p className='empty-shop'>Currently there are no products. Please choose products from the list</p>
                }
            </div>

            {
                cart.length > 0 &&
                <div className="cart-footer">
                    <p className='cart-total'>TOTAL: <span>${cartPrice}</span></p>
                    <Button onClick={checkoutHandler}>Purchase</Button>
                </div>
            }

        </aside>
     )
}
 
export default Cart;