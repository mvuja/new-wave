import React, { useState, useEffect } from 'react';
import './_cart.scss'
import { v4 as uuidv4 } from 'uuid';

const Cart = props => {

    useEffect(() => {
        console.log(props.cart)
    }, [props.cart])

    return ( 
        <aside id="cart">
            <ul>
                {
                    props.cart?.map(el => (
                        <li key={uuidv4()}>
                            <img className='item-img' src={el.image} alt="" />
                            <p className='item-title'>{el.title}</p>
                            <p className='item-desc'>{el.desc}</p>
                            <p className='item-price'>{el.price}</p>
                        </li>
                    ))
                }
            </ul>
        </aside>
     )
}
 
export default Cart;