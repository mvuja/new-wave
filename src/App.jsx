import { useState, useEffect } from "react"
import { usePromiseTracker, trackPromise } from "react-promise-tracker"
import { Route, Switch } from 'react-router-dom'

import Navbar from "./components/Navbar/Navbar"
import Products from "./components/Products/Products"
import Cart from "./components/Cart/Cart"
import Footer from "./components/Footer/Footer"
import Toast from "./components/UI/Toast"
// import Discount from "./components/Discount/Discount"

import Login from "./components/Pages/Login/Login"
import ProductPage from "./components/Pages/ProductPage/ProductPage"

function App() {

  const url = `https://fakestoreapi.com/products`

  const [products, setProducts] = useState(null)
  
  const [cart, setCart] = useState(getInitialProducts())
  const [cartCounter, setCartCounter] = useState(getInitialCounter())
  const [cartPrice, setCartPrice] = useState(getInitialPrice())

  const [toastCounter, setToastCounter] = useState(0)

  const [cartIsOpen, setCartIsOpen] = useState(false)
  const [toastIsOpen, setToastIsOpen] = useState(false)


  // API FETCHING
  useEffect(() => {
    trackPromise(
      fetch(url).then((res) => {
        return res.json()
      }).then((data) => {
        setProducts(data)
      })
    )
  }, [url])

  
  const { promiseInProgress } = usePromiseTracker()




  // LOCAL STORAGE
  useEffect(() => {
    const temp = JSON.stringify(cartCounter)
    localStorage.setItem('cartCounter', temp)
    let counterHolder = 0
    cart?.map(el => {
      counterHolder = counterHolder + el.counter
      return counterHolder
    })
    setCartCounter(counterHolder)
  }, [cart])


  useEffect(() => {
    const temp = JSON.stringify(cartPrice)
    localStorage.setItem('cartPrice', temp)
    let priceHolder = 0
    cart?.map(el => {
      if(el.counter <= 1){
        priceHolder = priceHolder + el.price
      }else{
        priceHolder = priceHolder + (el.price * el.counter)
      }
      return priceHolder
    })
    setCartPrice(Math.round(priceHolder * 100) / 100)
  }, [cart])


  function getInitialProducts() {
    const temp = localStorage.getItem('products')
    const savedProducts = JSON.parse(temp)
    return savedProducts || []
  }

  function getInitialCounter() {
    const temp = localStorage.getItem('cartCounter')
    const savedCounter = JSON.parse(temp)
    return savedCounter || 0
  }

  function getInitialPrice() {
    const temp = localStorage.getItem('cartPrice')
    const savedPrice = JSON.parse(temp)
    return savedPrice || 0
  }

  useEffect(() => {
      const temp = JSON.stringify(cart)
      localStorage.setItem('products', temp)
  }, [cart]) 






  // HANDLERS
  const setCartHandler = set => {
    setCart(set)
  }

  const setCartIsOpenHandler = set => {
    setCartIsOpen(set)
  }

  const checkoutHandler = () => {
    setToastCounter(cartCounter)
    setCartIsOpen(false)
    setToastIsOpen(true)
    setCart([])
    setTimeout(() => {
      setToastIsOpen(false)
    }, 5000)
  }

  const closeToastHandler = () => {
    setToastIsOpen(false)
  }

  const closeCartHadnler = () => {
    setCartIsOpen(false)
  }

  



  // LOGIN
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  
  
  useEffect(() => {
    const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn')

    if(storedUserLoggedInInformation === '1'){
      setIsLoggedIn(true)
    }
  }, [])

  const loginHandler = (email, password) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    localStorage.setItem('isLoggedIn', '1')
    setIsLoggedIn(true)
  }

  const logoutHandler = () => {
    setIsLoggedIn(false)
    localStorage.removeItem('isLoggedIn')
  }






  // ADD TO CART
  const addToCart = (id, title, price, img, desc, e, quantity) => {
    if(e){
      e.preventDefault()
    }

    let newCart = {}

    if(quantity){
      newCart = {
        id: id,
        title: title,
        price: price,
        image: img,
        desc: desc,
        counter: quantity
      }
    }else{
      newCart = {
        id: id,
        title: title,
        price: price,
        image: img,
        desc: desc,
        counter: 1
      }
    }
    
    const existingCartItemIntex = cart.findIndex(item => item.id === id)
    const existingCartItem = cart[existingCartItemIntex]

    let updatedItems

    if(quantity){
      if(existingCartItem){
        const updatedItem = {
            ...existingCartItem,
            counter: existingCartItem.counter + quantity
        }
        updatedItems = [...cart]
        updatedItems[existingCartItemIntex] = updatedItem
      }else{
            updatedItems = cart.concat(newCart)
      }
    }else{
      if(existingCartItem){
        const updatedItem = {
            ...existingCartItem,
            counter: existingCartItem.counter + 1
        }
        updatedItems = [...cart]
        updatedItems[existingCartItemIntex] = updatedItem
      }else{
          updatedItems = cart.concat(newCart)
      }
    }
    
    setCartHandler(updatedItems)
  }



  // USER'S ENTERED NAME FOR TOAST NOTIFICATION
  const [enteredName, setEnteredName] = useState('')

  const setNameHandler = name => {
    setEnteredName(name)
  }



  return (
    <>
      <Navbar setCartIsOpenHandler={setCartIsOpenHandler} cartIsOpen={cartIsOpen} cartCounter={cartCounter} />
      {
        isLoggedIn ?
        <>
          <Switch>
            <Route exact path="/">
              <Products products={products} cart={cart} setCartHandler={setCartHandler} promiseInProgress={promiseInProgress} addToCart={addToCart} />
            </Route>
            {/* <Route exact path='/product'>
                <NotMatch/>
            </Route> */}
            {
              // (promiseInProgress === true) ?
              //   <Route path='/product'>
              //     <ProductPage/>
              //   </Route>
              // :
              products?.map(el => (
                  <Route key={el.id} path={`/${el.title.trim().replace(/\s+/g, '-').replace(/[&\/\\#, +()$~%.'":*?<>{}]/g, '').toLowerCase()}`}>
                    <ProductPage el={el} addToCart={addToCart} products={products} />
                  </Route>
                ))
            }
            {/* <Route path="*" component={NotMatch}/> */}
          </Switch>
          <Cart cart={cart} cartIsOpen={cartIsOpen} setCartHandler={setCartHandler} cartPrice={cartPrice} checkoutHandler={checkoutHandler} closeCartHadnler={closeCartHadnler} />
          <Toast toastIsOpen={toastIsOpen} closeToastHandler={closeToastHandler} toastCounter={toastCounter} enteredName={enteredName} />
          <Footer />


          {/* <Products products={products} cart={cart} setCartHandler={setCartHandler} promiseInProgress={promiseInProgress} /> */}
          {/* <Discount /> */}
          {/* <Cart cart={cart} cartIsOpen={cartIsOpen} setCartHandler={setCartHandler} cartPrice={cartPrice} checkoutHandler={checkoutHandler} closeCartHadnler={closeCartHadnler} /> */}
          {/* <Toast toastIsOpen={toastIsOpen} closeToastHandler={closeToastHandler} toastCounter={toastCounter} /> */}
        </>
        :
        <Login onLogin={loginHandler} setNameHandler={setNameHandler} enteredName={enteredName} />
      }
    </>
  )
}


export default App