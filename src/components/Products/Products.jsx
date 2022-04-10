import React, { useState, useEffect } from 'react'
import Card from '../Card/Card'
import { v4 as uuidv4 } from 'uuid';
import './_products.scss';

const Products = ({ products, setCartHandler, cart }) => {  

    const addToCart = (id, title, price, img, desc) => {
        const newCart = {
            id: id,
            title: title,
            price: price,
            image: img,
            desc: desc,
            counter: 1
        }
        
        const existingCartItemIntex = cart.findIndex(item => item.id === id)
        const existingCartItem = cart[existingCartItemIntex]

        let updatedItems
        
        if(existingCartItem){
            const updatedItem = {
                ...existingCartItem,
                counter: existingCartItem.counter + 1
            }
            updatedItems = [...cart]
            updatedItems[existingCartItemIntex] = updatedItem
        }else{
            updatedItems = cart.concat(newCart)
        }

        setCartHandler(updatedItems)

    }

    return ( 
        <main id='main'>
            <div className="container">
                <ul className='product-list'>
                    {
                        products?.map((el, id) => (
                            <Card key={uuidv4()} id={el.id} img={el.image} title={el.title} price={el.price} category={el.category} desc={el.description} addToCart={addToCart} />
                            ))
                        }
                </ul>
            </div>
        </main>
     )
}
 
export default Products