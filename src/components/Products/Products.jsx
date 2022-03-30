import React, { useState, useEffect } from 'react'
import Card from '../Card/Card'
import './_products.scss';

const Products = props => {
    return ( 
        <div className="container">
            <ul className='product-list'>
                {
                    props.products?.map(el => (
                        <Card img={el.image} title={el.title} price={el.price} category={el.category} desc={el.description} />
                        ))
                    }
            </ul>
        </div>
     )
}
 
export default Products