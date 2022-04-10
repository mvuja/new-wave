import React, { useState, useEffect } from 'react';
import './_cart.scss'
import { v4 as uuidv4 } from 'uuid';

const Cart = ({ cart, cartIsOpen, setCartHandler }) => {


    const setNewCartHadnler = id => {
        setCartHandler(
            cart.filter(el => (
                el.id !== id
            ))
        )
    }

    useEffect(() => {
        // console.table(cart)
    }, [cart])

    return ( 
        <aside id="cart" className={`${cartIsOpen && 'open'}`}>
            <ul>
                {
                    cart.length ?
                    cart?.map( el => (
                        <li key={el.id}>
                            <div className="content">

                                <img className='item-img' src={el.image} alt={el.title} />
                                <p className='item-title'>{el.title}</p>
                                <p className='item-desc'>{el.desc}</p>
                                <p className='item-price'>{el.price}</p>
                            </div>
                            <button onClick={() => {setNewCartHadnler(el.id)}} className='trash'>T</button>
                            <p className="counter">{el.counter}</p>
                        </li>
                    ))
                    :
                    <p className='empty-shop'>Currently there are no products. Please choose products from the list</p>
                }
            </ul>
        </aside>
     )
}
 
export default Cart;