/* eslint-disable no-unused-vars */
import React from 'react';

export default function UsersList({ users }) {
  return (
    <div className='rounded-[20px] flex flex-col backdrop-blur-xl bg-white/10 border-2 border-white/10 transition-all overflow-hidden w-[100%] m-5 p-5 h-screen text-white' id="userlist">
      <h1 className='text-[30px]'>Users List</h1>
      <h1 className='relative ml-[90%]'>Total users: {users.length}</h1>

      <div className='flex justify-around mt-4 bg-black/30 p-2 rounded-xl gap-even'>
        <h1>UserName</h1>
        <h1>id</h1>
        <h1>Funds</h1>
        <h1>P&L</h1>
      </div>

      {users.map((user, index) => (
        <div key={index} className='flex justify-around mt-4 bg-white/[5%] p-2 rounded-xl gap-even '>
          <h1>{user.name}</h1>
          <h1>{user._id}</h1>
          <h1>{user.money}</h1>
          <h1>{user.pnl}%</h1>
        </div>
      ))}
    </div>
  );
}
