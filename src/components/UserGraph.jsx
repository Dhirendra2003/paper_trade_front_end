import { useState, useEffect } from 'react';
import axios from 'axios';
import { Chart } from "react-google-charts";
import money from './images/moneys 1.svg';
import wallet from './images/wallet.svg';
import growth from './images/growth.svg';

export default function UserGraph() {
  const [holdingsTotal, setHoldingsTotal] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHoldingsTotal = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const response = await axios.post('http://localhost:4400/holdingstotal', { mail: user.mail });
        console.log(response.data);
        if (response.data.status === 'success') {
          setHoldingsTotal(response.data.holdingsTotal);
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error fetching holdings total:', error);
      }
    };

    fetchHoldingsTotal();
  }, []);

  const options = {
    title: "Holdings Total",
    backgroundColor: { fill: 'transparent' },
    titleTextStyle: { color: 'white' },
    legend: { position: 'left', alignment: 'center', textStyle: { color: 'white' } },
    tooltip: { trigger: 'selection' },
    pieHole: 0.4
  };

  return (
    <>
      <div className='rounded-[20px] flex flex-col backdrop-blur-xl bg-white/10 border-2 border-white/10 transition-all overflow-hidden w-[100%] m-5 p-5  text-white h-[auto] '>
        <h1 className='text-[30px]'>Graph</h1>
        <div className=' flex place-content-between w-[80%] mx-[10%] mt-5 '>
          <div className='flex text-white gap-4 m-5'>
            <img src={money} className='p-3 bg-white/10 rounded-xl ' alt="" />
            <div className='my-[auto] '>
              <h1 className=''>Total assets</h1>
              <p className='text-[25px]'>$1234.5</p>
            </div>
          </div>

          <div className='flex text-white gap-4 m-5'>
            <img src={wallet} className='p-3 bg-white/10 rounded-xl ' alt="" />
            <div className='my-[auto] '>
              <h1 className=''>Total assets</h1>
              <p className='text-[25px]'>$1234.5</p>
            </div>
          </div>

          <div className='flex text-white gap-4 m-5'>
            <img src={growth} className='p-3 bg-white/10 rounded-xl ' alt="" />
            <div className='my-[auto] '>
              <h1 className=''>Total assets</h1>
              <p className='text-[25px]'>$1234.5</p>
            </div>
          </div>
        </div>

        {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          {holdingsTotal.length > 0 ? (
            <Chart
              chartType="PieChart"
              data={[['Stock', 'Total'], ...holdingsTotal.map(item => [Object.keys(item)[0], Object.values(item)[0]])]}
              options={options}
              width={"100%"}
              height={"400px"}
            />
          ) : (
            <p>No data available.</p>
          )}
        </>
      )}


      </div>
      <div className='rounded-[20px] flex flex-col backdrop-blur-xl bg-white/10 border-2 border-white/10 transition-all overflow-hidden w-[100%] m-5 p-5  text-white h-[auto] '>
        <h1 className='text-[30px]'>Higgest Returns:</h1>
        <div className='flex justify-around mt-4 bg-black/30 p-2 rounded-xl gap-even'>
        
          <h1> StockName</h1>
          <h1>Buy price</h1>
          <h1>Sell price</h1>
          <h1>Net P&L</h1>
        </div>
        <div className='flex justify-around mt-4 bg-green-700 p-2 rounded-xl gap-even '>
         
          <h1> TATA power Ltd.</h1>
          <h1>₹ 104.11</h1>
          <h1>₹ 110.23</h1>
          <h1>+5%^</h1>
        </div>
      </div>
      <div className='rounded-[20px] flex flex-col backdrop-blur-xl bg-white/10 border-2 border-white/10 transition-all overflow-hidden w-[100%] m-5 p-5  text-white h-[auto] '>
      <h1 className='text-[30px]'>Recommended stocks:</h1>
      <div className='flex justify-around mt-4 bg-blue-800/60 p-2 rounded-xl gap-even mx-10 '>
          
          <h1> JPPOWER.NS</h1>
          <h1>LTP :  ₹ 17.10</h1>
        </div>
        <div className='flex justify-around mt-4 bg-blue-800/40 p-2 rounded-xl gap-even  mx-10'>
         
          <h1> PERSISTENT.NS</h1>
          <h1>LTP :  ₹ 3,909.95</h1>
        </div>
        <div className='flex justify-around mt-4 bg-blue-800/20 p-2 rounded-xl gap-even  mx-10'>
          
          <h1> POLYCAB.BO</h1>
          <h1>LTP :  ₹ 5302.00</h1>
        </div>
      </div>
    </>
  )
}
