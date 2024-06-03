import React from 'react'
import { heroImage } from '../assets'

const Home = () => {
  return (
    <main className='w-full h-[80vh] flex justify-center items-center'>
      <div 
        className="container rounded-lg w-[95%] h-[70vh] flex justify-center items-center relative"
        style={{ backgroundImage: `url(${heroImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="text-center text-white px-4 py-2 sm:px-8 sm:py-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold drop-shadow-lg">Welcome to Zippyzag</h1>
          <p className="mt-4 text-xl sm:text-2xl font-medium drop-shadow-md">Your favorite food delivery service, now just a tap away.</p>
        </div>
      </div>
    </main>
  )
}

export default Home
