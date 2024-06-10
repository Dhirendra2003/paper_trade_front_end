/* eslint-disable no-unused-vars */
import React from 'react'
import Plans from './Plans'
import { Link } from 'react-router-dom'
import { useEffect } from 'react';

export default function Landingpage() {


  return (
    <div>

      <div className='bgl1 text-white w-[100%] h-[100vh] flex flex-col  pt-20 gap-20 '>
        <div className='flex gap-20  mx-[auto] sticky top-0 w-full place-content-center p-5'>
        <a href="#plans">
          <button className='bg-white/20 px-4 py-1 scale-[1.2] rounded-xl hover:bg-gradient-to-b from-cyan-500 to-violet-500 '> Plans</button>
          </a>
          <Link to='/login'>
          <button className='bg-white/20 px-4 py-1 scale-[1.2] rounded-xl hover:bg-gradient-to-b from-cyan-500 to-violet-500 '>Login</button>
          </Link>
          <Link to='/register'>
          <button className='bg-white/20 px-4 py-1 scale-[1.2] rounded-xl hover:bg-gradient-to-b from-cyan-500 to-violet-500 '>Register</button>
          </Link>
        </div>
        <h1 className='text-[80px] m-[auto]' >We make trading <br /> clear and simple</h1>
      </div>
      <div className='bgl2 text-white flex w-[100%] place-content-center p-20 gap-10'>
        <div className='w-80 bg-white/10 px-4 py-2 text-center rounded-xl border-2 border-white/20 hover:scale-[1.05]'>
          <h1 className='text-purple-400 text-xl p-2'>Mentor Supported Learning Acceleration</h1>
          <p className='text-[15px] '>Mentor-supported learning acceleration provides personalized guidance for students, fostering rapid progress and cultivating critical thinking skills. With expert mentorship, students accelerate their learning journey and develop valuable lifelong learning habits.</p>
        </div>

        <div className='w-80 bg-white/10 px-4 py-2 text-center rounded-xl border-2 border-white/20 hover:scale-[1.05]'>
          <h1 className='text-purple-400 text-xl p-2'>Realistic Market Simulation & Global Symbols</h1>
          <p className='text-[15px] '>Mentor-supported learning acceleration provides personalized guidance for students, fostering rapid progress and cultivating critical thinking skills. With expert mentorship, students accelerate their learning journey and develop valuable lifelong learning habits.</p>
        </div>

        <div className='w-80 bg-white/10 px-4 py-2 text-center rounded-xl border-2 border-white/20 hover:scale-[1.05] transistion-all ease-in-out '>
          <h1 className='text-purple-400 text-xl p-2'>Overcome Your fears 
And test your strategies</h1>
          <p className='text-[15px] '>Mentor-supported learning acceleration provides personalized guidance for students, fostering rapid progress and cultivating critical thinking skills. With expert mentorship, students accelerate their learning journey and develop valuable lifelong learning habits.</p>
        </div>
      </div>

      <div className=' bgl3 text-white bg-black p-20 flex place-content-center'>
        <h1 className='text-[40px] capitalize w-[50%] text-center text-fuchsia-400 '>mentor guidance for pro members ,global Symbols , plastic money ,multiple graphs display ,monitor your portfolio</h1>
      </div>

      <Plans/>
    </div>
  )
}
