import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import UsersList from './UsersList';
import HistoryAll from './HistoryAll';
import axios from 'axios';

export default function AdminHome() {
  const [users, setUsers] = useState([]);
  const [allTrades, setAllTrades] = useState([]);

  useEffect(() => {
    // Fetch users
    axios.get('http://localhost:4400/users')
      .then(response => {
        if (response.data.status === 'success') {
          setUsers(response.data.users);
        } else {
          console.error('Error retrieving users:', response.data.msg);
        }
      })
      .catch(error => {
        console.error('Error retrieving users:', error);
      });

    // Fetch all trades
    axios.post('http://localhost:4400/allhistory', { admin: true })
      .then(response => {
        if (response.data.trades) {
          setAllTrades(response.data.trades);
        } else {
          console.error('Error retrieving all trades:', response.data.msg);
        }
      })
      .catch(error => {
        console.error('Error retrieving all trades:', error);
      });
  }, []); // Empty dependency array to run only on component mount

  return (
    <div className='w-full bgimg'>
      <div className=''>
        <div className='flex '>
          <Navbar userAdmin={true} />
          <div className='w-full'>
            <div className='flex flex-col w-[96%] '>
              <UsersList users={users} />
              <HistoryAll allTrades={allTrades} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
