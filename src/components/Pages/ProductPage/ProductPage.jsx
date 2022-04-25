import React, { useState } from 'react';
import './_product-page.scss'

import Button from '../../UI/Button';

const ProductPage = ({ el, addToCart }) => {
    return ( 
        <div className="container">
            <div className="product-grid">
                <div className="image-holder">
                    <img src={el.image} alt={el.title} />
                </div>
                <div className="product-content">
                    <h2 className='product-title'>{el.title}</h2>
                    <p className='product-category'>{el.category}</p>
                    <p className='product-desc'>{el.description}</p>

                    <form onSubmit={e => addToCart(el.id, el.title, el.price, el.image, el.description, e)} className="add-to-cart">
                        <input type="number" max='10' min='1' step='1' defaultValue='1' />
                        <Button>Add to cart</Button>
                    </form>

                </div>
            </div>
        </div>
     )
}
 
export default ProductPage