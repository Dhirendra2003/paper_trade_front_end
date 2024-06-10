import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Holdings() {
  const [holdings, setHoldings] = useState([]);
  const [amount, setAmount] = useState(0);

 

  useEffect(() => {
    
    const fetchHoldings = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const response = await axios.post('http://localhost:4400/userholdings', { mail: user.mail });
        console.log(response.data, "1st");
        setHoldings(response.data.holdings);
        setAmount(response.data.moneyt); // Assuming the response data contains the total invested amount
      } catch (error) {
        console.error('Error fetching holdings:', error);
      }
    };

    fetchHoldings();
  }, []);

  




  return (
    <a href='/portfolio' className='rounded-[20px] flex flex-col backdrop-blur-xl bg-white/10 border-2 border-white/10 transition-all overflow-hidden w-[30%] m-5 p-5  text-white h-[500px]'>
      <h1 className='text-[30px]'>Portfolio</h1>
      <h1 className='relative '>Total invested: {amount}</h1>

      
<div className='overflow-y-scroll'>
      { holdings.length>0 && holdings.map((holding, index) => (
        <div key={index} className=' justify-around 4 bg-white/[5%] p-4 rounded-xl mx-5 my-1 ' >
          <h1>{holding.symbol}</h1>
          <h1>Qty.-{holding.qty}</h1>
          <h1>₹ {holding.price}</h1>
         
         
          <h1 className={holding.tradeType === "Buy" ? "text-green-400" : "text-red-400"}>{holding.tradeType}</h1>
          <h1> Total- ₹ {(holding.total).toFixed(2)}</h1>
          
        </div>
      ))}
      </div>
      {holdings.length===0 && <h1 className='text-2xl text-center my-[auto]' >No holdings currently</h1>}
    </a>
  );
}
