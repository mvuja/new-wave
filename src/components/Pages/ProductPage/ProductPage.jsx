import React, { useState, useEffect, useReducer } from 'react'
import './_product-page.scss'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'

import NotFound from '../NotFound/NotFound'

import Button from '../../UI/Button'
import Card from '../../Card/Card'

import bgImg from '../../../Assets/single-product-bg.png'

import { usePromiseTracker, trackPromise } from "react-promise-tracker"
import GridLoader from "react-spinners/GridLoader";
import { css } from "@emotion/react";

const ProductPage = ({ products, addToCart }) => {

    const params = useParams()
    const { productID } = params

    const [sinlgeProduct, setSingleProduct] = useState({})

    useEffect(() => {
        trackPromise(
            fetch(`https://dummyjson.com/products/${productID}`).then((res) => {
                return res.json()
            }).then((data) => {
                setSingleProduct(data)
                console.log(data)
            })
        )
    }, [productID])
    const { promiseInProgress } = usePromiseTracker()
    // LOADER
    const override = css`
        display: block;
        margin: 0 auto;
        border-color: red;
    `;

    const color = '#171719'


    // FOR OTHER STUFF

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

    const filteredProducts = products?.filter(element => {
        return element.category === sinlgeProduct.category && element.id !== sinlgeProduct.id
    }).slice(0, 3)

    const goodIDs = products.map(el => el.id)

    return (

        <>
        {

            (goodIDs.includes(+productID)) ?
        
            <section id="single-product">
                <img className='single-product-bg' src={bgImg} alt="graphic" />
                {
                (promiseInProgress !== true && sinlgeProduct) ?
                <>
                    <div className="container">
                        <div className="product-grid">
                            <div className="image-holder">
                                <img src={sinlgeProduct.thumbnail} alt={sinlgeProduct.title} />
                            </div>
                            <div className="product-content">
                                <h2 className='product-title'>{sinlgeProduct.title}</h2>
                                <p className='product-category'>{sinlgeProduct.category}</p>
                                <p className='product-desc'>{sinlgeProduct.description}</p>
                                <p className='product-price'>${sinlgeProduct.price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>

                                <form onSubmit={e => addToCart(sinlgeProduct.id, sinlgeProduct.title, sinlgeProduct.price, sinlgeProduct.thumbnail, sinlgeProduct.description, e, counter)} className="add-to-cart">
                                    <div className="quantity-container">
                                        <button className='minus' onClick={quantityMinus}>-</button>
                                        <input className='product-quantity' type="text" value={counter} readOnly />
                                        <button className='plus' onClick={quantityPlus}>+</button>
                                    </div>
                                    <Button type='submit'>Add to cart</Button>
                                </form>

                            </div>
                        </div>


                        <div className="similar-products">
                            <h3>Similar products</h3>
                            <ul className="similar-products-grid">
                                {
                                filteredProducts.map(el => (
                                    <Card key={el.id} id={el.id} img={el.thumbnail} title={el.title} price={el.price} category={el.category} desc={el.description} addToCart={addToCart} similar={true} />
                                    ))
                                }
                            </ul>
                        </div>

                    </div>
                </>
                :
                <div id="loader">
                    <GridLoader color={color} css={override} size={20} />
                </div>
                }
            </section>

            :

            <NotFound />
        }
        </>



     )
}
 
export default ProductPage