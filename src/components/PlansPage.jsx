//import React from 'react'
import Topbar from './Topbar'
import Navbar from './Navbar'
import Plans from './Plans'


export default function PlansPage() {
  return (
    <div className='w-full  bgimg  '>

    <div className=''>
      <Topbar />
      <div className='flex '>
        <Navbar />
        <div className='w-full'>
        <div className='flex w-[100%]'>
          <Plans/>
        </div>
        
        
        </div>
      </div>
     

    </div>

  </div>
  )
}
