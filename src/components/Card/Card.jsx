import './_card.scss'
import Button from '../UI/Button'

import trash from '../../Assets/trash.svg'

import { Link } from 'react-router-dom'

import thousandSeparator from '../../thousandSeparator'

const Card = (props) => {

    const setNewCartHandler = id => {
        props.setCartHandler(
            props.cart.filter(el => (
                el.id !== id
            ))
        )
    }

    return ( 
        <li className={`${props.isCart ? 'card in-cart' : 'card'}`}>
            <Link to={`/product/${props.id}`} className="card--image-link">
                <img className='card--img' src={props.img} alt={props.title} />
            </Link>
            <div className="title-price">
                <Link to={`/product/${props.id}`}>
                    <h4 className="card--title">{props.title}</h4>
                </Link>

            </div>
            <p className="card--category">{props.category}</p>
            <div className="desc-addToCart">
                <p className="card--price">${thousandSeparator(props.price)}</p>
                {
                    props.isCart
                    ?
                    <button onClick={() => {setNewCartHandler(props.id)}} className='trash'>
                        <img src={trash} alt="Trash item" />
                    </button>
                    :
                    <Button onClick={() => props.addToCart(props.id, props.title, props.price, props.img, props.desc)}>Add to cart</Button>
                }
            </div>
            {
                props.counter !== 0 && props.counter <= 99 && props.isCart
                ?
                <span className='counter'>{props.counter}</span>
                :
                props.counter > 99
                ?
                <span className='counter counter-full'>99+</span>
                :
                <span></span>
            }
        </li>
     )
}
 
export default Card