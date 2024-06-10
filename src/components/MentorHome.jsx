//import React from 'react'

export default function MentorHome() {
  return (
    <div className=" bgimg w-[100%] min-h-screen 0 p-5 flex flex-col place-content-center">
      
    <div className=' rounded-[20px] flex flex-col backdrop-blur-xl bg-white/10 border-2 border-white/10 transition-all overflow-hidden w-[auto] m-5 p-5  text-white ' id="mentorassign">
        <h1 className="text-[30px]">Users Assigned to You </h1>
    <div className='flex justify-around mt-4 bg-black/30 p-2 rounded-xl gap-even'>
  <h1>Mentor ID </h1>
  <h1>Users Assigned</h1>
</div>

<div className='flex justify-around mt-4 bg-white/[10%] p-2 rounded-xl  place-content-center '>
     <h1 className='my-[auto] text-4xl'>Mentor 005 </h1>
     <div className='bg-black/20 text-center flex flex-col place-content-center w-[50%] rounded-xl p-2'>
      <h1 className='m-[auto] my-3'>User 1</h1>
      <h1 className='m-[auto] my-3'>User 1</h1>
      <h1 className='m-[auto] my-3'>User 1</h1>
      <h1 className='m-[auto] my-3'>User 1</h1>
      <h1 className='m-[auto] my-3'>User 1</h1>

     </div>
    </div>

   <div className="m-5 grid place-content-center  w-[100%]">
   <h1 className="text-[30px]"> User Invitations:</h1>

   <div className='flex justify-around mt-4 bg-white/[10%] p-2 rounded-xl w-96  place-content-center '>
    <h1 className="my-[auto]">User 1: </h1>
    <button className="bg-green-700 p-2 rounded-lg  "> Accept</button>
   </div>
   <div className='flex justify-around mt-4 bg-white/[10%] p-2 rounded-xl w-96  place-content-center '>
    <h1 className="my-[auto]">User 1: </h1>
    <button className="bg-green-700 p-2 rounded-lg  "> Accept</button>
   </div>
   <div className='flex justify-around mt-4 bg-white/[10%] p-2 rounded-xl w-96  place-content-center '>
    <h1 className="my-[auto]">User 1: </h1>
    <button className="bg-green-700 p-2 rounded-lg  "> Accept</button>
   </div>
   </div>

    </div>
  </div>
  )
}
