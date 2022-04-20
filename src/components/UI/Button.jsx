import './_button.scss'
import cartIconWhite from '../../Assets/cart-icon-white.svg'

const Button = ({onClick, children}) => {

    return (
        <button onClick={onClick} className='main-btn'>
            <img src={cartIconWhite} alt="cart icon" />
            {children}
        </button>
    )
}
 
export default Button;