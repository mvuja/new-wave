import React, {useState} from 'react'
import Card from '../Card/Card'
import FilterDropdown from '../FilterDropdown/FilterDropdown';
import Search from '../Search/Search';
import './_products.scss';
import { css } from "@emotion/react";
import GridLoader from "react-spinners/GridLoader";

import heroImg from '../../Assets/hero-bg.png'
import { useEffect } from 'react';

const Products = ({ products, promiseInProgress, addToCart }) => {  

    const [filteredProducts, setFilteredProducts] = useState([])

    useEffect(() => {
        if(products){
            setFilteredProducts(products)
        }
    }, [products])



    // FILTER BY CATEGORY
    const filterProductsHandler = e => {

        if(e.target.value === 'all'){
            setFilteredProducts(products)
        }else{
            setFilteredProducts(
            products.filter(el => {
                return el.category === e.target.value
            })
            )
        }
    }


    // FILTER BY SEARCH
    const [inputSearch, setInputSearch] = useState('')
    const [searchParam] = useState(["title", "description"])

    function search(items) {
        return items.filter((item) => {
            return searchParam.some((newItem) => {
                return (
                    item[newItem]
                        .toString()
                        .toLowerCase()
                        .indexOf(inputSearch.toLowerCase()) > -1
                )
            })
        })
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
            <div className="hero-bg-container">
                <img src={heroImg} alt="hero background" />
            </div>
            <div className="container">
                <div className="products-heading">
                    <h2>Products</h2>
                    <Search inputSearch={inputSearch} setInputSearch={setInputSearch} />
                    <FilterDropdown filterProductsHandler={filterProductsHandler} products={products} />
                </div>

                {(promiseInProgress === true) ?

                    <div id="loader">
                        <GridLoader color={color} css={override} size={20} />
                    </div>
                :
                    <ul className='product-list'>
                        {
                            search(filteredProducts)?.map(el => (
                                <Card key={el.id} id={el.id} img={el.thumbnail} title={el.title} price={el.price} category={el.category} desc={el.description} addToCart={addToCart} />
                            ))
                        }
                    </ul>
                }
            </div>
        </main>
     )
}
 
export default Products