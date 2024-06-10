import axios from 'axios';
import { useState, useEffect } from 'react';

export default function Trades() {
  const [tradeHistory, setTradeHistory] = useState([]);
  const user = localStorage.getItem('user');
  const amount = JSON.parse(user)?.money;
  const email = JSON.parse(user)?.mail;

  const fetchTradeHistory = async (email) => {
    try {
      const response = await axios.post('http://localhost:4400/historyuser', { mail: email });
      return response.data.tradeHistory || [];
    } catch (error) {
      console.error('Error fetching trade history:', error);
      return [];
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (email) {
        const history = await fetchTradeHistory(email);
        setTradeHistory(history);
      }
    };

    fetchData();
  }, [email]);

  return (
    <div className='rounded-[20px] flex flex-col backdrop-blur-xl bg-white/10 border-2 border-white/10 transition-all overflow-hidden w-[100%] m-5 p-5 min-h-screen text-white'>
      <h1 className='text-[30px]'>History</h1>
      <h1 className='relative ml-[90%]'>Wallet: ₹ {amount}</h1>

      <div className='flex justify-around mt-4 bg-black/30 p-2 rounded-xl gap-even'>
        <h1>Stock Name</h1>
        <h1>Qty</h1>
        <h1>Price</h1>
        <h1>Total</h1>
        <h1>Trade Type</h1>
      </div>

      {tradeHistory.length > 0 ? (
        tradeHistory.map((trade, index) => (
          <div key={index} className='flex justify-around mt-4 bg-white/[5%] p-2 rounded-xl gap-even'>
            <h1>{trade.symbol}</h1>
            <h1>{trade.qty}</h1>
            <h1>₹ {trade.price}</h1>
            <h1>₹ {trade.total}</h1>
            <h1>{trade.tradeType}</h1>
          </div>
        ))
      ) : (
        <h1 className='text-2xl text-center my-[auto]' >No trade history available</h1>
      )}
    </div>
  );
}
