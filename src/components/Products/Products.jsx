import React, { useState, useEffect } from 'react'
import Card from '../Card/Card'
import { v4 as uuidv4 } from 'uuid';
import './_products.scss';

const Products = props => {  

    const addToCart = (id, title, price, img, desc) => {
        const newCart = {
            id: id,
            title: title,
            price: price,
            image: img,
            desc: desc,
        }
        props.setCartHandler([...props.cart, newCart])
    }

    return ( 
        <main id='main'>
            <div className="container">
                <ul className='product-list'>
                    {
                        props.products?.map((el, id) => (
                            <Card key={uuidv4()} id={id} img={el.image} title={el.title} price={el.price} category={el.category} desc={el.description} addToCart={addToCart} />
                            ))
                        }
                </ul>
            </div>
        </main>
     )
}
 
export default Products