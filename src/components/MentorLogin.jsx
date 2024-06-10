/* eslint-disable no-unused-vars */
import React from 'react'
import logo from './images/Combo.svg'

export default function MentorLogin() {
  return (
    <div className='bgl3 bg-black flex flex-col h-screen text-white  m-[auto] 
      place-content-center'>

      <div className='mx-[auto]  '>
        <img src={logo} className="invert h-20 my-[auto]" />
        <h1 className='font-bold my-[auto] text-[35px] leading-[0.8] text-fuchsia-500 -top-1 relative pt-4'>Paper <br />Trade</h1>
      </div>

      <div className='  rounded-xl border-2 border-white/10 bg-white/[5%] p-5 backdrop-blur-lg w-96 mx-[auto] my-4'>
        <h1 className='text-[30px] text-fuchsia-200 text-center '>Mentor Login</h1>

        <div className=' flex flex-col place-content-center mt-10'>
          <h2 className='text-xl pl-4'>Email</h2>
          <input className='bg-black/50 text-xl p-1 w-80 rounded-xl m-2 text-center border-2 border-white/20' type="text" />
        </div>

        <div className=' flex flex-col place-content-center mt-2'>
          <h2 className='text-xl pl-4'>Password</h2>
          <input className='bg-black/50 text-xl p-1 w-80 rounded-xl m-2 text-center border-2 border-white/20' type="password" />
        </div>
        <div className='m-[auto] grid place-content-center'>
          <button type='submit' className='  py-1  rounded-xl bg-gradient-to-b from-cyan-500 to-violet-500 w-40 mx-2 mt-4 text-xl'>Login</button>
        
          

        </div>
      </div>
    </div>
  )
}
