import React, { useState, useEffect } from 'react'
import './_product-page.scss'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'

import NotFound from '../NotFound/NotFound'

import Button from '../../UI/Button'
import Card from '../../Card/Card'

import thousandSeparator from '../../../thousandSeparator'

import bgImg from '../../../Assets/single-product-bg.png'

import { usePromiseTracker, trackPromise } from "react-promise-tracker"
import GridLoader from "react-spinners/GridLoader";
import { css } from "@emotion/react";

import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';


const ProductPage = ({ products, addToCart }) => {

    const params = useParams()
    const { productID } = params

    const [singleProduct, setSingleProduct] = useState({})

    useEffect(() => {
        trackPromise(
            fetch(`https://dummyjson.com/products/${productID}`).then((res) => {
                return res.json()
            }).then((data) => {
                setSingleProduct(data)
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
        return element.category === singleProduct.category && element.id !== singleProduct.id
    }).slice(0, 3)

    const goodIDs = products.map(el => el.id)

    return (
        <>
        {

            (goodIDs.includes(+productID)) ?
        
            <section id="single-product">
                <img className='single-product-bg' src={bgImg} alt="graphic" />
                {
                (promiseInProgress !== true && singleProduct) ?
                <>
                    <div className="container">
                        <div className="product-grid">
                            <div className="image-holder">
                                <Swiper
                                    modules={[Pagination]}
                                    pagination={{ clickable: true }}
                                    loop={true}
                                    spaceBetween={50}
                                    slidesPerView={1}
                                    // onSlideChange={() => console.log('slide change')}
                                    // onSwiper={(swiper) => console.log(swiper)}
                                    >
                                    {
                                        singleProduct.images?.map((img, id) => (
                                            <SwiperSlide key={id}>
                                                <img src={img} alt="" />
                                            </SwiperSlide>
                                        ))
                                    }
                                </Swiper>
                                {/* <img src={singleProduct.thumbnail} alt={singleProduct.title} /> */}
                            </div>
                            <div className="product-content">
                                <h2 className='product-title'>{singleProduct.title}</h2>
                                <p className='product-category'>{singleProduct.category}</p>
                                <p className='product-desc'>{singleProduct.description}</p>
                                <p className='product-price'>${thousandSeparator(singleProduct?.price)}</p>

                                <form onSubmit={e => addToCart(singleProduct.id, singleProduct.title, singleProduct.price, singleProduct.thumbnail, singleProduct.description, e, counter)} className="add-to-cart">
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