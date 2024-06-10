/* eslint-disable no-unused-vars */
import React from 'react'
import '../index.css'
import Navbar from './Navbar'
import Topbar from './Topbar';
import UserGraph from './UserGraph';


export default function Analytics() {
  return (
    <div className='w-full  bgimg  '>

      <div className=''>
        <Topbar />
        <div className='flex '>
          <Navbar />
          <div className='w-full'>
          <div className='flex flex-col w-[95%]'>
            <UserGraph/>
          </div>
          
          
          </div>
        </div>
       

      </div>

    </div>
  )
}

