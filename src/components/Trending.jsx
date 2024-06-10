/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';

async function getMovers(setTrendings) {
  var gainers = [];
  var loosers = [];
  var volume = [];

  const url =
    "https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/v2/get-movers?region=IN&lang=en-US&start=0&count=10";
  const options = {
    method: "GET",
    headers: {
      'X-RapidAPI-Key': '848609c3f4msh50d106083c6db63p140ad3jsn992a28b11242',
      "X-RapidAPI-Host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.text();
    const data = JSON.parse(result);

    data.finance.result[0].quotes.forEach(quote => {
      gainers.push(quote.symbol);
    });

    data.finance.result[1].quotes.forEach(quote => {
      loosers.push(quote.symbol);
    });

    data.finance.result[2].quotes.forEach(quote => {
      volume.push(quote.symbol);
    });

    const trendings = gainers.map((gainer, index) => [gainer, loosers[index], volume[index]]);
    setTrendings(trendings);
  } catch (error) {
    console.error(error);
  }
}

export default function Trending() {
  const [trendings, setTrendings] = useState([]);

  useEffect(() => {
    getMovers(setTrendings);
  }, []);

  return (
    <div className='rounded-[20px] backdrop-blur-xl bg-white/10 border-2 border-white/10 transition-all overflow-hidden w-[100%] m-5 p-5 h-[500px] text-white'>
      <h1 className='text-[30px]'>Trending Today:</h1>
      <table className='table-auto w-[100%] text-center my-10 text-xl'>
        <tbody>
          <tr className='bg-zinc-800/40 p-4'>
            <th className='text-left'>gainers</th>
            <th className='text-left'>loosers</th>
            <th className='text-left'>Volume</th>
          </tr>
          {trendings.map((item, index) => (
            <tr key={index} className='p-4'>
              <td className='p-2 text-left'>{item[0]}</td>
              <td className='p-2 text-left'>{item[1]}</td>
              <td className='p-2 text-left'>{item[2]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
