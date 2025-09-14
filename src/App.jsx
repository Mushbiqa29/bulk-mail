import React from 'react'
import Mail from'./components/mail';
import { useState } from 'react';
import Video  from './assets/loader.mp4'
import Mobilevideo  from './assets/loader_phone.mp4'
export const App = () => {
  const[isvideoplay,setisVideoEnd]=useState(true)
  return (

        <div className='text-center'>
          {
            isvideoplay?(<><video src={Video} autoPlay muted preload='auto' className='w-full h-screen object-cover bg-no-repeat hidden md:block ' onEnded={()=>{
setisVideoEnd(false)
            }}></video><video src={Mobilevideo} autoPlay  muted  preload='auto'className='w-full h-screen object-cover bg-no-repeat block md:hidden ' onEnded={()=>{
setisVideoEnd(false)
            }}></video></>) : <Mail/>
          }
    </div>
  )
}
