import Mail from '../components/mail'
import { useNavigate } from 'react-router-dom'
import Video from '../assets/loader.mp4'
import Mobilevideo from '../assets/loader_phone.mp4'
import React, { useState, useEffect } from 'react'
const Home = () => {
  const navigate = useNavigate()
const fullText = 'BULK MAIL'
const [isVideoPlay, setIsVideoEnd] = useState(true)
const [displayText, setDisplayText] = useState('')
useEffect(() => {
    if (isVideoPlay) {
      let index = 0
      const interval = setInterval(() => {
        setDisplayText(fullText.slice(0, index + 1))
        index++
        if (index === fullText.length) {
          clearInterval(interval)
        }
      }, 3000 / fullText.length) 
      return () => clearInterval(interval)
    }
  }, [isVideoPlay])

  const handleLogout = () => {
    localStorage.clear()
    navigate('/')
  }

  return (

   <>
   {isVideoPlay ? (
        <div className='relative w-full h-screen'>
          <video
            src={Video}
            autoPlay
            muted
            preload='auto'
            className='w-full h-screen object-cover bg-no-repeat hidden md:block'
            onEnded={() => setIsVideoEnd(false)}
          ></video>
          <video
            src={Mobilevideo}
            autoPlay
            muted
            preload='auto'
            className='w-full h-screen object-cover bg-no-repeat block md:hidden'
            onEnded={() => setIsVideoEnd(false)}
          ></video>
          <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-50'>
            <h1 className='text-6xl md:text-8xl font-bold text-white font-neue-machina animate-pulse'>
              {displayText}
            </h1>
          </div>
        </div>
      ) : (
       <div className='min-h-screen bg-gradient-to-br from-primary via-accent4 to-accent3 p-6 '>
      <div className='max-w-6xl mx-auto bg-hidden  rounded-lg shadow-2xl p-8  scale-[0.7]'>
        <div className='flex justify-end  items-center mb-6'>
          <button
            className='btn-3d py-2 px-6 bg-primary text-black font-semibold rounded-lg hover:bg-primary-dark transition-colors'
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
        <Mail />
      </div>
    </div>
        
      )}
   </>
  )
}

export default Home
