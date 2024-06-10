//import React from 'react'

export default function Plans() {
  
  let mail;
  var user
  try {
     user= localStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);
      mail = parsedUser.mail;
    } else {
      console.error('User data not found in localStorage.');
    }
  } catch (error) {
    console.error('Error parsing user data:', error);
  }
  const handleClick = () => {
    if (user) {
      updateProStatus(mail);
    } else {
     window.location.href='/login'
    }
  };
  

  function updateProStatus(mail) {
    if(!mail){
      window.location.href='/login'
      return
    }
    fetch('http://localhost:4400/setpro', {
      method: 'POST', // Assuming it's a POST request based on the example response
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({"mail":mail,"paid":true})
    })
    .then(response => response.json())
    .then(data => {
      if (data.status === 'success') {
        // If status is success, show alert
        window.alert('You are a pro user now');
        window.location.href=('/home')
      } else {
        // Handle other cases if needed
      }
    })
    .catch(error => {
      console.error('Error:', error);
      // Handle error if needed
    });
  }
  return (
    <div className='bgl5 flex w-full place-content-center gap-28 text-white  p-20 ' id='plans' >
    <div className='w-96 bg-white/10 px-20 py-10 text-center rounded-xl border-4 border-white/20 hover:scale-[1.05]  '>
        <h1  className='text-white text-[40px] p-2'>Free</h1>
        <ul className='p-4 list-disc text-left leading-[3em] text-lg '>
          <li>Mentor Guidance</li>
          <li>Basic Chart Types</li>
          <li>5min standard Chart Time frames </li>
          <li> starter Money points 10,00,000</li>

        </ul>
        <a href="/home">
        <button  className=' px-4 py-1 scale-[1.2] rounded-xl bg-gradient-to-b from-cyan-500/90 to-violet-500/90 mt-12 '>Continue</button>
        </a>
      </div>

      <div className='w-96 bg-white/10 bg-gradient-to-b from-pink-500/40 to-blue-500/20 px-20 py-10 text-center rounded-xl border-4 border-fuchsia-200  hover:scale-[1.05] '>
        <h1 className='text-fuchsia-300 text-[40px] p-2'>Pro Plan</h1>
        <ul className='p-4 list-disc text-left leading-[3em] text-lg'>
          <li>Mentor Guidance</li>
          <li>Multiple Chart Types</li>
          <li>Multiple Chart Time frames </li>
          <li>2X starter Money points(20,00,000)</li>

        </ul>
        <p className='p-2'>₹ 999/year</p>
        <button onClick={handleClick} className=' px-4 py-1 scale-[1.2] rounded-xl bg-gradient-to-b from-cyan-500 to-violet-500  relative mt-4 hover:shadow-md hover:shadow-cyan-500/50 '>Get Started</button>
      </div>

    </div>  
  )
}
