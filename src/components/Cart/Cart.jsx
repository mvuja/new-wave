import React, { useState, useEffect } from 'react';
import './_cart.scss'

const Cart = ({ cart, cartIsOpen, setCartHandler, cartPrice }) => {



    const setNewCartHadnler = id => {
        setCartHandler(
            cart.filter(el => (
                el.id !== id
            ))
        )
    }


    return ( 
        <aside id="cart" className={`${cartIsOpen && 'open'}`}>
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
                            <button onClick={() => {setNewCartHadnler(el.id)}} className='trash'>T</button>
                            <p className="counter">{el.counter}</p>
                        </article>
                    ))
                    :
                    <p className='empty-shop'>Currently there are no products. Please choose products from the list</p>
                }
            </div>

            {
                cart.length &&
                <div className='cart-total'>TOTAL: ${cartPrice}</div>
            }

        </aside>
     )
}
 
export default Cart;