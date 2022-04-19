import React, { useState, useEffect } from 'react'
import Card from '../Card/Card'
import { v4 as uuidv4 } from 'uuid';
import './_products.scss';
import { css } from "@emotion/react";
import GridLoader from "react-spinners/GridLoader";

const Products = ({ products, setCartHandler, cart, promiseInProgress }) => {  

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

    // LOADER

    const override = css`
        display: block;
        margin: 0 auto;
        border-color: red;
    `;

    const color = '#171719'

    return ( 
        <main id='main'>
            <div className="container">
                <h2 className='products-heading'>Products</h2>

                {(promiseInProgress === true) ?

                    <div id="loader">
                        <GridLoader color={color} css={override} size={20} />
                    </div>
                :
                    <ul className='product-list'>
                        {
                            products?.map((el, id) => (
                                <Card key={uuidv4()} id={el.id} img={el.image} title={el.title} price={el.price} category={el.category} desc={el.description} addToCart={addToCart} />
                                ))
                            }
                    </ul>
                }
            </div>
        </main>
     )
}
 
export default Products