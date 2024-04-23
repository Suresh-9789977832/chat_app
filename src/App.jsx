import { Navigate, Route, Routes } from "react-router-dom"
import Home from "./Pages/Home"
import Login from "./Pages/Login"
import Singup from "./Pages/Singup"
import { Toaster } from "react-hot-toast"
import { useContext, useState } from "react"
import { Authcontext } from "./Context/Authcontext"
import MessageContainer from "./Components/Messages/MessageContainer"


function App() {

  const {authuser}=useContext(Authcontext)


  return <>
    <div className="background_image"></div>
    <div className="p-4 h-screen flex items-center justify-center blur_effect">
      <Toaster/>
      <Routes>
        <Route path="/" element={authuser?<Home />:<Navigate to={'/login'}/>} />
        <Route path="/login" element={authuser? <Navigate to={'/'}/>:<Login/>} />
        <Route path="/signup" element={<Singup />} />
        </Routes>
      </div>
  </>
}

export default App
