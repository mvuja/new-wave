import { useState, useEffect } from 'react'
import './_navbar.scss'
import cartIcon from '../../Assets/cart-icon.svg'
import logo from '../../Assets/logo.svg'

import { Link } from 'react-router-dom'

const Navbar = props => {


    const CartOpenHandler = () => {
        if(props.cartIsOpen){
            props.setCartIsOpenHandler(false)
        }else{
            props.setCartIsOpenHandler(true)
        }
    }


    return (  
        <nav>
            <div className="container">
                <Link to='/'>
                    <img src={logo} alt="New Wave" className="logo" />
                </Link>
                <button className='cart' onClick={CartOpenHandler}>
                    <img src={cartIcon} alt="" /> 
                    {
                        props.cartCounter !== 0 &&
                        <span className='cart-counter'>{props.cartCounter}</span>
                    }
                </button>
            </div>
        </nav>
    )
}

export default Navbar