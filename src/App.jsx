import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import SignUp from './component/signup/SignUp'
import Login from './component/signup/Login'

function App() {
const [isAuthenticated, setIsAuthenticated]=useState()
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/signup' element={<SignUp setIsAuthenticated={setIsAuthenticated}/>}></Route>
        <Route path='/login' element={<Login setIsAuthenticated={setIsAuthenticated}/>}></Route>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
