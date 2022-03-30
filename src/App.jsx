import { useState, useEffect } from "react"
import Navbar from "./components/Navbar/Navbar"
import Products from "./components/Products/Products"
import Footer from "./components/Footer/Footer"

function App() {

  const url = `https://fakestoreapi.com/products`

  const [products, setProducts] = useState([])

  useEffect(() => {
    fetch(url).then((res) => {
        return res.json()
    }).then((data) => {
      setProducts(data)
    })
}, [url])

  return (
    <>
      <Navbar />
      <Products products={products} />
      <Footer />
    </>
  )
}


export default App