import { useState, useEffect } from "react"
import Navbar from "./components/Navbar/Navbar"
import Products from "./components/Products/Products"
import Cart from "./components/Cart/Cart"
import Footer from "./components/Footer/Footer"

function App() {

  const url = `https://fakestoreapi.com/products`

  const [products, setProducts] = useState([])

  const [cart, setCart] = useState(getInitialProducts())

  const [cartIsOpen, setCartIsOpen] = useState(false)

  useEffect(() => {
    fetch(url).then((res) => {
        return res.json()
    }).then((data) => {
      setProducts(data)
    })
  }, [url])


  function getInitialProducts() {
    const temp = localStorage.getItem('products')
    const savedProducts = JSON.parse(temp)
    return savedProducts || []
  }

  useEffect(() => {
      const temp = JSON.stringify(cart)
      localStorage.setItem('products', temp)

      console.log(cart)
  }, [cart]) 

  const setCartHandler = set => {
    setCart(set)
  }

  const setCartIsOpenHandler = set => {
    setCartIsOpen(set)
    console.log(cartIsOpen)
  }

  return (
    <>
      <Navbar setCartIsOpenHandler={setCartIsOpenHandler} cartIsOpen={cartIsOpen} />
      <Products products={products} cart={cart} setCartHandler={setCartHandler} />
      <Cart cart={cart} cartIsOpen={cartIsOpen} />
      <Footer />
    </>
  )
}


export default App