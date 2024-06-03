import React from 'react'
import { heroImage } from '../assets'

const Home = () => {
  return (
    <main className='w-full h-full my-auto flex justify-center items-center'>
      <div className="container flex  w-[90%] h-[80vh]" style={{ backgroundImage: `url(${heroImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div>
            <h1 className="text-white">The text</h1>
        </div>
      </div>
    </main>
  )
}

export default Home
