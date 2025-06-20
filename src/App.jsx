import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import SignUp from './component/signup/SignUp'
import Login from './component/signup/Login'
import Banner from './component/HomePage/Banner'
import Header from './component/Header'

function App() {
const [isAuthenticated, setIsAuthenticated]=useState()
 const [showSubmenu, setShowSubmenu] = useState(false);
  return (
    <>
   
      <BrowserRouter>
       <Header />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/signup' element={<SignUp setIsAuthenticated={setIsAuthenticated}/>}></Route>
        <Route path='/login' element={<Login setIsAuthenticated={setIsAuthenticated}/>}></Route>

        {/* home */}
        <Route path='/banner' element={<Banner />}></Route>


      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
