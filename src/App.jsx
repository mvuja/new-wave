import { useState, useEffect, useRef } from 'react'
import { Route, Switch } from 'react-router-dom'

import Navbar from './components/Navbar/Navbar'
import Products from './components/Products/Products'
import Cart from './components/Cart/Cart'
import Footer from './components/Footer/Footer'
import Toast from './components/UI/Toast'
import NotFound from './components/Pages/NotFound/NotFound'
import ProductPage from './components/Pages/ProductPage/ProductPage'
import LoginModal from './components/LoginModal/LoginModal'

import useAuthStore from './store/useAuthStore'
import useCartStore from './store/useCartStore'

function App() {
  const { init: initAuth, isAuthenticated, user } = useAuthStore()
  const { clearCart } = useCartStore()

  const [cartIsOpen, setCartIsOpen]         = useState(false)
  const [loginModalOpen, setLoginModalOpen] = useState(false)
  const [toastIsOpen, setToastIsOpen]       = useState(false)
  const [toastCounter, setToastCounter]     = useState(0)

  const pendingCheckout = useRef(null)

  useEffect(() => { initAuth() }, [initAuth])

  const doCheckout = (cartCount) => {
    setToastCounter(cartCount)
    setCartIsOpen(false)
    setToastIsOpen(true)
    clearCart()
    setTimeout(() => setToastIsOpen(false), 5000)
  }

  // Complete pending checkout after login
  useEffect(() => {
    if (isAuthenticated && pendingCheckout.current !== null) {
      doCheckout(pendingCheckout.current)
      pendingCheckout.current = null
    }
  }, [isAuthenticated])

  const handleCheckout = (cartCount) => {
    if (!isAuthenticated) {
      pendingCheckout.current = cartCount
      setCartIsOpen(false)
      setLoginModalOpen(true)
      return
    }
    doCheckout(cartCount)
  }

  return (
    <>
      <Navbar
        cartIsOpen={cartIsOpen}
        setCartIsOpenHandler={setCartIsOpen}
        onLoginClick={() => setLoginModalOpen(true)}
      />

      <Switch>
        <Route exact path="/">
          <Products />
        </Route>
        <Route path="/product/:productSlug">
          <ProductPage />
        </Route>
        <Route path="*" component={NotFound} />
      </Switch>

      <Cart
        cartIsOpen={cartIsOpen}
        closeCartHandler={() => setCartIsOpen(false)}
        onCheckout={handleCheckout}
      />

      <Toast
        toastIsOpen={toastIsOpen}
        closeToastHandler={() => setToastIsOpen(false)}
        toastCounter={toastCounter}
        userEmail={user?.email}
      />

      <Footer />

      {loginModalOpen && (
        <LoginModal onClose={() => setLoginModalOpen(false)} />
      )}
    </>
  )
}

export default App

