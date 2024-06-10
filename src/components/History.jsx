/* eslint-disable no-unused-vars */
import React from 'react'
import '../index.css'
import Navbar from './Navbar'
import Topbar from './Topbar';
import Graph from './Graph';
import Trending from './Trending';
import BuySell from './BuySell';
import Holdings from './Holdings';
import Trades from './Trades';


export default function History() {
  return (
    <div className='w-full  bgimg  '>

      <div className=''>
        <Topbar />
        <div className='flex '>
          <Navbar />
          <div className='w-full'>
          <div className='flex w-[100%]'>
            <Trades/>
          </div>
          
          
          </div>
        </div>
       

      </div>

    </div>
  )
}

