import { useState, useEffect } from "react"
import { usePromiseTracker, trackPromise } from "react-promise-tracker";
import Navbar from "./components/Navbar/Navbar"
import Products from "./components/Products/Products"
import Cart from "./components/Cart/Cart"
import Footer from "./components/Footer/Footer"
import Toast from "./components/UI/Toast"
import Discount from "./components/Discount/Discount"

function App() {

  const url = `https://fakestoreapi.com/products`

  const [products, setProducts] = useState([])
  
  const [cartCounter, setCartCounter] = useState(getInitialCounter())
  const [cartPrice, setCartPrice] = useState(getInitialPrice())
  const [cart, setCart] = useState(getInitialProducts())

  const [cartIsOpen, setCartIsOpen] = useState(false)
  const [toastIsOpen, setToastIsOpen] = useState(false)

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

  const setCartHandler = set => {
    setCart(set)
  }

  const setCartIsOpenHandler = set => {
    setCartIsOpen(set)
  }

  const checkoutHandler = () => {
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

  return (
    <>
      <Navbar setCartIsOpenHandler={setCartIsOpenHandler} cartIsOpen={cartIsOpen} cartCounter={cartCounter} />
      <Products products={products} cart={cart} setCartHandler={setCartHandler} promiseInProgress={promiseInProgress} />
      {/* <Discount /> */}
      <Cart cart={cart} cartIsOpen={cartIsOpen} setCartHandler={setCartHandler} cartPrice={cartPrice} checkoutHandler={checkoutHandler} closeCartHadnler={closeCartHadnler} />
      <Toast toastIsOpen={toastIsOpen} closeToastHandler={closeToastHandler} />
      <Footer />
    </>
  )
}


export default App