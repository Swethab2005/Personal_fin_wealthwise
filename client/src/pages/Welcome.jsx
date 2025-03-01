import React from 'react'
import Navbar from '../Components/Navbar'
import Header from '../Components/Header'
import { assets } from '../assets/assets' // Ensure correct path

const Welcome = () => {
  return (
    <div 
      className="relative w-full h-screen bg-cover bg-center bg-no-repeat" 
      style={{ backgroundImage: `url(${assets.bg})` }} 
    >
      <Navbar />
      <div className="flex flex-col items-center justify-center h-full text-white">
        <Header />
      </div>
    </div>
  )
}

export default Welcome
