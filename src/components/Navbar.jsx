/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import img1 from './images/Menu.svg'
import img2 from './images/profile.svg'
import img3 from './images/Futures.svg'
import img4 from './images/history.svg'
import img5 from './images/logout.svg'
import img6 from './images/Briefcase.svg'
import img7 from './images/Crown.svg'
import connectimg from './images/connect.svg'
import home from './images/home.svg'

export default function Navbar(props) {
  const userDataString = localStorage.getItem('user');
  const userDataObject = JSON.parse(userDataString);

  const logout=()=>{
    localStorage.removeItem('user');
    window.alert("Logging Out!")
    window.location.href = '/';
  }
  const [showNav, setShowNav] = useState(true)
  return (
    <div className={'bg-white/10 border-2 border-white/10 transition-all  border-white rounded-[20px]  backdrop-blur-xl m-5' +
      (showNav ? ' w-60' : ' w-20')}>

        {!(props.userAdmin) &&
          <>
      <div className='sticky top-40 flex flex-col h-[75vh] min-h-[70vh] mx-[auto] place-content-center ml-5'>
        <img onClick={() => { setShowNav(!showNav) }} src={img1} className='invert  h-8 -left-2 relative  my-[auto]' />

        <a  href='/home' className='flex gap-5 my-[auto] hover:bg-white/10 hover:rounded-xl hover:scale-[105%]' >
              <img src={home} className='invert h-8' />
              {showNav && <h1 className='text-white z-5 font-semibold text-xl'>Home</h1>}
            </a>

           {!userDataObject.pro && <a href='/subscription' className='flex gap-5 my-[auto] hover:bg-white/10 hover:rounded-xl hover:scale-[105%]'>
              <img src={img7} className='invert h-8' />
              {showNav && <h1 className='text-white z-5 font-semibold text-xl'>Pro Plan</h1>}
            </a>}

            { false && <div className='flex gap-5 my-[auto] hover:bg-white/10 hover:rounded-xl hover:scale-[105%]' >
              <img src={img2} className='invert h-8' />
              {showNav && <h1 className='text-white z-5 font-semibold text-xl'>Profile</h1>}
            </div>}

           {userDataObject.pro && <a  href='/analytics' className='flex gap-5 my-[auto] hover:bg-white/10 hover:rounded-xl hover:scale-[105%]'>
              <img src={img3} className='invert h-8' />
              {showNav && <h1 className='text-white z-5 font-semibold text-xl'>Analytics</h1>}
            </a>}

            <a href='/history' className='flex gap-5 my-[auto] hover:bg-white/10 hover:rounded-xl hover:scale-[105%] '>
              <img src={img4} className='invert h-8' />
              {showNav && <h1 className='text-white z-5 font-semibold text-xl'>History</h1>}
            </a>

            

            <a href='/portfolio' className='flex gap-5 my-[auto] hover:bg-white/10 hover:rounded-xl hover:scale-[105%]'>
              <img src={img6} className='invert h-8' />
              {showNav && <h1 className='text-white z-5 font-semibold text-xl'>Portfolio</h1>}
            </a>

            
            <div className='flex gap-5 my-[auto]  hover:bg-white/10 hover:rounded-xl hover:scale-[105%]'  onClick={()=>{logout()}}>
              <img src={img5} className='invert h-8' />
              {showNav && <h1 className='text-white z-5 font-semibold text-xl'>Logout</h1>}
            </div>
            
            </div>
            
            </>
        }
        {(props.userAdmin) &&
          <>
            <div className='sticky top-10 flex flex-col h-[80vh] min-h-[10vh] mx-[auto] place-content-center ml-5'>
        <img onClick={() => { setShowNav(!showNav) }} src={img1} className='invert  h-8 -left-2 relative  my-[auto]' />
        
           <a href='#userlist' className='flex gap-5 my-[auto]' >
              <img src={img2} className='invert h-8' />
              {showNav && <h1 className='text-white z-5 font-semibold text-xl'>Users</h1>}
            </a>

            <a href='#historyadmin' className='flex gap-5 my-[auto]'>
              <img src={img4} className='invert h-8' />
              {showNav && <h1 className='text-white z-5 font-semibold text-xl'>History</h1>}
            </a>

            { false && <a href='#mentorassign' className='flex gap-5 my-[auto] '>
              <img src={connectimg} className='invert h-8' />
              {showNav && <h1 className='text-white z-5 font-semibold text-xl'>Mentor <br />Assign</h1>}
            </a>}
            <div className='flex gap-5 my-[auto]' onClick={()=>{window.location.href='/adminlogin'}}>
              <img src={img5} className='invert h-8' />
              {showNav && <h1 className='text-white z-5 font-semibold text-xl'>Logout</h1>}
            </div>
</div>
          </>
        }
      

    </div>
  )
}
