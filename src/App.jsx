import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import SignUp from './component/signup/SignUp'
import Login from './component/signup/Login'
import Features from './component/HomePage/Features'
import ProductsList from './component/products/ProductsList'
import ProductPage from './component/products/ProductPage'
import CategoryProduct from './component/products/CategoryProduct'
import ScrollToTop from './component/ScrollToTop'
import CartPage from './component/products/CartPage'

function App() {
const [isAuthenticated, setIsAuthenticated]=useState()
 const [showSubmenu, setShowSubmenu] = useState(false);
  return (
    <>
      <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/signup' element={<SignUp setIsAuthenticated={setIsAuthenticated}/>}></Route>
        <Route path='/login' element={<Login setIsAuthenticated={setIsAuthenticated}/>}></Route>
        <Route path='/Features' element={<Features />}></Route>
        <Route path='/productslist' element={<ProductsList />}></Route>
      <Route path="/productpage/:id" element={<ProductPage />} ></Route>
        <Route path='/category/:category' element={<CategoryProduct />}></Route>
        <Route path='/addtocart' element={<CartPage />}></Route>


      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
