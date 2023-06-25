import React, { useState, useEffect } from 'react';
import './_card.scss';
import Button from '../UI/Button';

import { Link } from 'react-router-dom';

const Card = (props) => {

    return ( 
        <li className='card'>
            <Link to={`/product/${props.id}`} className="card--image-link">
                <img className='card--img' src={props.img} alt={props.title} />
            </Link>
            <div className="title-price">
                <Link to={`/product/${props.id}`}>
                    <h4 className="card--title">{props.title}</h4>
                </Link>
                <p className="card--price">${props.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
            </div>
            <p className="card--category">{props.category}</p>
            <div className="desc-addToCart">
                <p className="card--desc">{props.desc}</p>
                <Button onClick={() => props.addToCart(props.id, props.title, props.price, props.img, props.desc)}>Add to cart</Button>
            </div>
        </li>
     )
}
 
export default Card;