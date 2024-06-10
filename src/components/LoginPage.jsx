/* eslint-disable no-unused-vars */
import { useState } from 'react'
import logo from './images/Combo.svg'
import axios from 'axios';
import { Link } from 'react-router-dom';




export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    try {
      const result = await axios.post('http://localhost:4400/login', { mail: email, pass: pass });
      console.log(result);
      const { status, msg, user } = result.data;
      if (status === 'success') {
        window.prompt(msg);
        localStorage.setItem('user', JSON.stringify(user));
        window.location.href = '/home';
      } else {
        window.alert(msg)
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred. Please try again.');
    }
  };
  


  return (
    <div className='loginbg  h-screen text-white flex m-[auto] place-content-center gap-20 '>

      <div className='my-[auto] flex scale-125  ml-40'>
        <img src={logo} className="invert h-20 my-[auto]" />
        <h1 className='font-bold my-[auto] text-[35px] leading-[0.8] text-fuchsia-500 -top-1 relative pt-4'>Paper <br />Trade</h1>
      </div>
      <div className=' my-[auto]  rounded-xl border-2 border-white/10 bg-white/[5%] p-5 backdrop-blur-lg'>

        <h1 className='text-[30px] text-fuchsia-200 text-center '>Login</h1>

        <div className=' flex flex-col place-content-center mt-10'>
          <h2 className='text-xl pl-4'>Email</h2>
          <input className='bg-black/50 text-xl p-1 w-80 rounded-xl m-2 text-center border-2 border-white/20' type="text" onChange={(event) => { setEmail(event.target.value) }} />
        </div>

        <div className=' flex flex-col place-content-center mt-2'>
          <h2 className='text-xl pl-4' >Password</h2>
          <input className='bg-black/50 text-xl p-1 w-80 rounded-xl m-2 text-center border-2 border-white/20' type="password" onChange={(event) => { setPass(event.target.value) }}/>
        </div>
        <div className='m-[auto] grid place-content-center'>
          <button type='submit' className='  py-1  rounded-xl bg-gradient-to-b from-cyan-500 to-violet-500 w-40 mx-2 mt-4 text-xl' onClick={()=>{handleSubmit(email,pass)}} >Login</button>
          <Link to='/register'>
          <button className='w-40   text-white/70 underline text-lg mx-[auto] my-4'>Register here</button>
          </Link>


        </div>
      
      </div>
    </div>
  )
}
