import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import SignUp from './component/signup/SignUp'
import Login from './component/signup/Login'
import Banner from './component/HomePage/Banner'
import Header from './component/Header'
import Features from './component/HomePage/Features'
import SubBanner from './component/HomePage/SubBanner'

function App() {
const [isAuthenticated, setIsAuthenticated]=useState()
 const [showSubmenu, setShowSubmenu] = useState(false);
  return (
    <>
   
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/signup' element={<SignUp setIsAuthenticated={setIsAuthenticated}/>}></Route>
        <Route path='/login' element={<Login setIsAuthenticated={setIsAuthenticated}/>}></Route>

        {/* home */}
        {/* <Route path='/banner' element={<Banner />}></Route> */}
        {/* <Route path='/SubBanner' element={<SubBanner />}></Route> */}
        <Route path='/Features' element={<Features />}></Route>


      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
