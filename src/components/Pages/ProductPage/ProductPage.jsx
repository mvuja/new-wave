import React, { useState } from 'react';
import './_product-page.scss'

const ProductPage = ({ el }) => {
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
                </div>
            </div>
        </div>
     )
}
 
export default ProductPage