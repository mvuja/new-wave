import { useState, useEffect } from "react"
import Navbar from "./components/Navbar/Navbar"
import Products from "./components/Products/Products"
import Cart from "./components/Cart/Cart"
import Footer from "./components/Footer/Footer"

function App() {

  const url = `https://fakestoreapi.com/products`

  const [products, setProducts] = useState([])
  const [cartCounter, setCartCounter] = useState(getInitialCounter())

  const [cart, setCart] = useState(getInitialProducts())

  const [cartIsOpen, setCartIsOpen] = useState(false)

  useEffect(() => {
    fetch(url).then((res) => {
        return res.json()
    }).then((data) => {
      setProducts(data)
    })
  }, [url])

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

  return (
    <>
      <Navbar setCartIsOpenHandler={setCartIsOpenHandler} cartIsOpen={cartIsOpen} cartCounter={cartCounter} />
      <Products products={products} cart={cart} setCartHandler={setCartHandler} />
      <Cart cart={cart} cartIsOpen={cartIsOpen} setCartHandler={setCartHandler} />
      <Footer />
    </>
  )
}


export default App