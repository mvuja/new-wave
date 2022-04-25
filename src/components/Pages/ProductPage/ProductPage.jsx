import React, { useEffect, useState } from 'react';
import './_product-page.scss'

import Button from '../../UI/Button';

const ProductPage = ({ el, addToCart }) => {

    const [counter, setCounter] = useState(1)

    const quantityPlus = e => {
        e.preventDefault()
        if(counter > 0 && counter < 10){
            setCounter(counter + 1)
        }
    }

    const quantityMinus = e => {
        e.preventDefault()
        if(counter > 1 && counter < 11){
            setCounter(counter - 1)
        }
    }

    useEffect(() => {
        console.log(counter)
    }, [counter])

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

                    <form onSubmit={e => addToCart(el.id, el.title, el.price, el.image, el.description, e, counter)} className="add-to-cart">
                        <div className="quantity-container">
                            <button className='minus' onClick={quantityMinus}>-</button>
                            <input className='product-quantity' type="text" value={counter} readOnly />
                            <button className='plus' onClick={quantityPlus}>+</button>
                        </div>
                        <Button type='submit'>Add to cart</Button>
                    </form>

                </div>
            </div>
        </div>
     )
}
 
export default ProductPage