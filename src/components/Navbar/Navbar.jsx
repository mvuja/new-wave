import { useState, useRef, useEffect } from 'react'
import './_navbar.scss'
import cartIcon from '../../Assets/cart-icon.svg'
import logo from '../../Assets/logo.svg'
import { Link } from 'react-router-dom'
import useAuthStore from '../../store/useAuthStore'
import useCartStore from '../../store/useCartStore'
import Button from '../UI/Button'

const Navbar = ({ onLoginClick, cartIsOpen, setCartIsOpenHandler }) => {
  const { user, isAuthenticated, logout } = useAuthStore()
  const cartItems = useCartStore((s) => s.cartItems)
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = e => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const displayName = user?.firstName || user?.username || user?.email?.split('@')[0] || ''

  return (
    <nav>
      <div className="container">
        <Link to='/' className="logo">
          <img src={logo} alt="New Wave" />
        </Link>

        <div className="nav-right">
          {isAuthenticated ? (
            <div className="user-menu" ref={dropdownRef}>
              <button
                className="user-trigger"
                onClick={() => setDropdownOpen(prev => !prev)}
                aria-haspopup="true"
                aria-expanded={dropdownOpen}
              >
                {user?.image ? (
                  <img src={user.image} alt="" className="avatar avatar-img" />
                ) : (
                  <span className="avatar" aria-hidden="true">
                    {displayName.charAt(0).toUpperCase()}
                  </span>
                )}
                <span className="user-email">{displayName}</span>
                <span className={`chevron ${dropdownOpen ? 'open' : ''}`}>&#9662;</span>
              </button>

              {dropdownOpen && (
                <div className="user-dropdown" role="menu">
                  <p className="dropdown-email">{user?.email || user?.username}</p>
                  <hr />
                  <button
                    className="dropdown-item logout"
                    role="menuitem"
                    onClick={() => { setDropdownOpen(false); logout() }}
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Button onClick={onLoginClick} icon={false}>Sign in</Button>
          )}

          <button
            className='cart'
            onClick={() => setCartIsOpenHandler(!cartIsOpen)}
            aria-label="Open cart"
          >
            <img src={cartIcon} alt="" />
            {cartCount > 0 && (
              <span className={`cart-counter ${cartCount > 99 ? 'cart-counter-full' : ''}`}>
                {cartCount > 99 ? '99+' : cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar