import './_button.scss'
import cartIconWhite from '../../Assets/cart-icon-white.svg'

const Button = ({ onClick, children, type, icon = true, disabled = false, added = false, adding = false }) => {
  const extraClass = adding ? ' btn--adding' : added ? ' btn--added' : ''
  return (
    <button type={type} onClick={onClick} className={`main-btn${extraClass}`} disabled={disabled}>
      <span>
        {icon && <img src={cartIconWhite} alt="" />}
        {children}
      </span>
    </button>
  )
}

export default Button