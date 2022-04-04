import React, { useState, useEffect } from 'react';
import './_card.scss';

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
                <button onClick={() => props.addToCart(props.id, props.title, props.price, props.img, props.desc)} className='card--addToCart'>Add to cart</button>
            </div>
        </li>
     )
}
 
export default Card;