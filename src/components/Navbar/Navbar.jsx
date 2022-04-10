import { useState, useEffect } from 'react'
import './_navbar.scss'

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
                <p className='logo'>LOGO</p>
                <button className='cart' onClick={CartOpenHandler}>C</button>
            </div>
        </nav>
    )
}

export default Navbar