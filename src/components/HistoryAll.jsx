// HistoryAll.jsx
import React from 'react';

export default function HistoryAll({ allTrades }) {
  return (
    <div className='rounded-[20px] flex flex-col backdrop-blur-xl bg-white/10 border-2 border-white/10 transition-all overflow-hidden w-[100%] m-5 p-5 h-screen text-white ' id="historyadmin">
      <h1 className='text-[30px]'>All History</h1>

      <div className='flex justify-around mt-4 bg-black/30 p-2 rounded-xl gap-even'>
        <h1>Symbol</h1>
        <h1>Qty.</h1>
        <h1>User</h1>
        <h1> Price</h1>
        <h1>TradeType</h1>
      </div>

<div className='overflow-y-scroll'>
      {/* Map over allTrades array and render trade data */}
      {allTrades.map((trade, index) => (
        <div key={index} className='flex justify-around mt-4 bg-white/[5%] p-2 rounded-xl gap-even'>
          <h1>{trade.symbol}</h1>
          <h1>{trade.qty}</h1>
          <h1> {trade.mail}</h1>
          <h1>₹ {trade.price}</h1>
          <h1>{trade.tradeType}</h1>
        </div>
      ))}
      </div>
    </div>
  );
}
