/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import '../index.css'
import Navbar from './Navbar'
import Topbar from './Topbar';
import Graph from './Graph';
import Trending from './Trending';
import BuySell from './BuySell';
import Holdings from './Holdings';
import { useEffect } from 'react';

const user=localStorage.getItem('user');
export default function Home() {
  
  
  const [stockName ,setStockName]=useState('^NSEI');
  const[stockupdated,setStockUpdate]=useState("initial")

  useEffect(() => {
    console.log("New stock name:", stockName);
  }, [stockName]);
 
  
  return (
  <>
   {user && <div className='w-full  bgimg  p-0 m-0 '>

      <div className=''>
        <Topbar  setStockName={setStockName}/>
        <div className='flex'>
          <Navbar />
          <div className='w-full'>
          <div className='flex w-[100%]'>
            <Graph stockName={stockName} setStockUpdate={setStockUpdate} stockupdated={stockupdated}/>
            <BuySell  setStockUpdate={setStockUpdate} stockupdated={stockupdated}/>
          </div>
          <div className='flex w-[100%]'>
            <Trending />
            <Holdings />
          </div>
          
          </div>
        </div>
       

      </div>

    </div>}
    </>)
  }
