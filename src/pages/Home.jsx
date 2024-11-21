import React from 'react'
import { heroImage } from '../assets'

const Home = () => {
  return (
    <main className='w-full h-[89vh] flex justify-center items-center'>
      <div 
        className="container rounded-lg w-[95%] h-[75vh] shadow-lg "
        style={{ backgroundImage: `url(${heroImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="text-center text-white px-4 py-2 sm:px-8 sm:py-4">
          
        </div>
      </div>
    </main>
  )
}

export default Home
