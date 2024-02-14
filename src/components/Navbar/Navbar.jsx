import './_navbar.scss'
import cartIcon from '../../Assets/cart-icon.svg'
import logo from '../../Assets/logo.svg'

import { Link } from 'react-router-dom'

const Navbar = ({cartIsOpen, cartCounter, setCartIsOpenHandler}) => {


    const CartOpenHandler = () => {
        if(cartIsOpen){
            setCartIsOpenHandler(false)
        }else{
            setCartIsOpenHandler(true)
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
                    {/* {
                        cartCounter !== 0 &&
                        <span className='cart-counter'>{cartCounter}</span>
                    } */}

                    {
                        cartCounter !== 0 && cartCounter <= 99
                        ?
                        <span className='cart-counter'>{cartCounter}</span>
                        :
                        cartCounter > 99
                        ?
                        <span className='cart-counter cart-counter-full'>99+</span>
                        :
                        <span></span>
                    }
                </button>
            </div>
        </nav>
    )
}

export default Navbar