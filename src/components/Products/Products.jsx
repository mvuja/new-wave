import React, { useState, useEffect } from 'react'
import Card from '../Card/Card'
import { v4 as uuidv4 } from 'uuid';
import './_products.scss';
import { css } from "@emotion/react";
import GridLoader from "react-spinners/GridLoader";

import heroImg from '../../Assets/hero-bg.png'

const Products = ({ products, promiseInProgress, addToCart }) => {  



    // LOADER

    const override = css`
        display: block;
        margin: 0 auto;
        border-color: red;
    `;

    const color = '#171719'

    return ( 
        <main id='main'>
            <div className="hero-bg-container">
                <img src={heroImg} alt="hero background" />
            </div>
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