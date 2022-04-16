import React, { useState, useEffect } from 'react';
import './_card.scss';
import Button from '../UI/Button';

const Card = (props) => {

    return ( 
        <li className='card'>
            <img className='card--img' src={props.img} alt={props.title} />
            <div className="title-price">
                <h4 className="card--title">{props.title}</h4>
                <p className="card--price">${props.price}</p>
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