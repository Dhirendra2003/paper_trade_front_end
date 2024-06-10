/* eslint-disable no-unused-vars */
import React from 'react'
import '../index.css'
import Navbar from './Navbar'
import Topbar from './Topbar';
import Holding from './Holding';


export default function Portfolio() {
  return (
    <div className='w-full  bgimg  '>

      <div className=''>
        <Topbar />
        <div className='flex '>
          <Navbar />
          <div className='w-full'>
          <div className='flex w-[100%]'>
            <Holding/>
          </div>
          
          
          </div>
        </div>
       

      </div>

    </div>
  )
}

