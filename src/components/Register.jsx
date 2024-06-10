import { useState } from 'react'
import logo from './images/Combo.svg'
import axios from 'axios';
import { Link } from 'react-router-dom';



const handleSubmit = (name, pass, email) => {
  const Email = email;
  const Pass = pass;
  const Name = name;

  axios.post('http://localhost:4400/register', { 'name':Name, 'mail':Email, 'pass':Pass, money:1000000,holdings:{} })
    .then(result => {
      console.log(result);
      if(result.data.status==='failed'){
        window.alert(result.data.msg)
      }else if(result.data.status==='success'){
        window.alert(result.data.msg)
        window.location.href='/login'
      }
    })
    .catch(err => {
      console.log(err);
    });
};

function validateName(name) {
  // eslint-disable-next-line no-useless-escape
  const nameRegex = /^[A-Za-z\s\-]+$/;
  if (nameRegex.test(name)) {
    return true;
  } else {
    return false;
  }
}
function validatePassword(password) {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (passwordRegex.test(password)) {
    return true;
  } else {
    return false;
  }
}
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailRegex.test(email)) {
    return true;
  } else {
    return false;
  }
}




export default function Register() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [pass, setPass] = useState();
  const [reppass, setRepPass] = useState();

  function formValidation() {
    if (!validateName(name)) {
      window.alert('enter valid name!');
    }
    else if (!validateEmail(email)) {
      window.alert('Enter valid Email!')
    }
    else if (!validatePassword(pass)) {
      window.alert('Your password should be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character!')
    }
    else if (pass !== reppass) {
      window.alert('Passwords are NOT matching!')
    }
    else {
      handleSubmit(name,pass,email)
    }
  }

  return (
    <div className='loginbg  h-screen text-white flex m-[auto] place-content-center gap-20 '>

      <div className='my-[auto] flex scale-125  ml-40'>
        <img src={logo} className="invert h-20 my-[auto]" />
        <h1 className='font-bold my-[auto] text-[35px] leading-[0.8] text-fuchsia-500 -top-1 relative pt-4'>Paper <br />Trade</h1>
      </div>

      <div className=' my-[auto]  rounded-xl border-2 border-white/10 bg-white/[5%]  flex flex-col p-5 backdrop-blur-lg'>
        <h1 className='text-[30px] text-fuchsia-200 text-center '>Register</h1>
        <div className=' flex flex-col place-content-center mt-2'>
          <h2 className='text-xl pl-4'>Name</h2>
          <input className='bg-black/50 text-xl p-1 w-80 rounded-xl m-2 text-center border-2 border-white/20' type="text" onChange={(event) => { setName(event.target.value) }} />
        </div>

        <div className=' flex flex-col place-content-center mt-2'>
          <h2 className='text-xl pl-4'>Email</h2>
          <input className='bg-black/50 text-xl p-1 w-80 rounded-xl m-2 text-center border-2 border-white/20' type="email" onChange={(event) => { setEmail(event.target.value) }} />
        </div>

        <div className=' flex flex-col place-content-center mt-2'>
          <h2 className='text-xl pl-4'>Password</h2>
          <input className='bg-black/50 text-xl p-1 w-80 rounded-xl m-2 text-center border-2 border-white/20' onChange={(event) => { setPass(event.target.value) }} type="password" />
        </div>
        <div className=' flex flex-col place-content-center mt-2'>
          <h2 className='text-xl pl-4'>Confirm Password</h2>
          <input className='bg-black/50 text-xl p-1 w-80 rounded-xl m-2 text-center border-2 border-white/20' type="text" onChange={(event) => { setRepPass(event.target.value) }} />
        </div>
        <div className='w-[100%] place-content-center grid '>
          <button className='  py-1  rounded-xl bg-gradient-to-b from-cyan-500 to-violet-500 w-40 relative mx-[auto] mt-4 text-xl' onClick={() => { formValidation() }}>Register</button><br />
          <Link to='/login'>
          <button className=' w-40 text-white/70 underline  text-lg mx-[auto]'>Login here</button><br />
          </Link>


        </div>
      </div>

    </div>
  )
}
