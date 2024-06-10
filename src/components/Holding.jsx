import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Holding() {
  const [holdings, setHoldings] = useState([]);
  const [amount, setAmount] = useState(0);
  const [lastPrices, setLastPrices] = useState({});
  const userDataString = localStorage.getItem('user');
  const userDataObject = JSON.parse(userDataString);

  useEffect(() => {
    const fetchHoldings = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const response = await axios.post('http://localhost:4400/userholdings', { mail: user.mail });
        setHoldings(response.data.holdings);
        setAmount(response.data.moneyt);

        const prices = {};
        for (const holding of response.data.holdings) {
          const lastPrice = await fetchLtp(holding.symbol);
          prices[holding.symbol] = lastPrice;
        }
        setLastPrices(prices);
      } catch (error) {
        console.error('Error fetching holdings:', error);
      }
    };

    fetchHoldings();
  }, []);

  const fetchLtp = async (name) => {
    const url = `https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v3/get-chart?interval=5m&symbol=${name}&range=1d&region=IN&includePrePost=false&useYfid=true&includeAdjustedClose=true&events=capitalGain%2Cdiv%2Csplit`;
    const optionsHeaders = {
      'X-RapidAPI-Key': '848609c3f4msh50d106083c6db63p140ad3jsn992a28b11242',

      'X-RapidAPI-Host': 'apidojo-yahoo-finance-v1.p.rapidapi.com'
    };
    try {
      const response = await fetch(url, { method: 'GET', headers: optionsHeaders });
      const data = await response.json();
      const closes = data.chart.result[0].indicators.quote[0].close;
      const lastClose = closes[closes.length - 1];
      return lastClose;
    } catch (error) {
      console.error(error);
    }
  };

  const handleExit = async (holding) => {
    const { symbol, qty, tradeType } = holding;
    const oppositeTradeType = tradeType === "Buy" ? "Sell" : "Buy";
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const response = await axios.post('http://localhost:4400/trade', {
        "symbol": symbol,
        "qty": qty,
        "price": lastPrices[holding.symbol],
        "total": (lastPrices[holding.symbol] * qty),
        "tradeType": oppositeTradeType,
        "mail": user.mail
      });

      if (response.data.status === "success") {
        alert("Trade executed successfully!");
        window.location.reload();
      } else {
        alert("Trade execution failed.");
      }
    } catch (error) {
      console.error('Error executing trade:', error);
    }
  };

  
  return (
    <div className='rounded-[20px] flex flex-col backdrop-blur-xl bg-white/10 border-2 border-white/10 transition-all overflow-hidden w-[100%] m-5 p-5 h-screen text-white'>
      <h1 className='text-[30px]'>Portfolio</h1>
      <h1 className='relative ml-[85%]'>Total invested: {userDataObject.money}</h1>

      <div className='flex justify-around mt-4 bg-black/30 p-2 rounded-xl m-5 gap-even-holding'>
        <h1>StockName</h1>
        <h1>Qty</h1>
        <h1>Buy price</h1>
        <h1>LTP</h1>
        <h1>Net P&L</h1>
        <h1>Buy/Sell</h1>
        <h1>Total Investment</h1>
        <h2></h2>
      </div>

      { holdings && holdings.map((holding, index) => (
        <div key={index} className='flex justify-around 4 bg-white/[5%] p-4 rounded-xl mx-5 my-1 gap-even-holding'>
          <h1>{holding.symbol}</h1>
          <h1>{holding.qty}</h1>
          <h1>₹ {holding.price}</h1>
         {lastPrices[holding.symbol] ? <h1>₹ {lastPrices[holding.symbol].toFixed(2)}</h1>:'--'}
          <h1 className={((lastPrices[holding.symbol] * holding.qty - holding.total) < 0) ? "text-red-400 drop-shadow-md" : "text-green-400 drop-shadow-md"}>
            {(lastPrices[holding.symbol] * holding.qty - holding.total).toFixed(2)}
          </h1>
          <h1 className={holding.tradeType === "Buy" ? "text-green-400" : "text-red-400"}>{holding.tradeType}</h1>
          <h1>₹ {(holding.total).toFixed(2)}</h1>
          <button onClick={() => handleExit(holding)} className="red-btn bg-red-500/40 border-[1px] border-red-500 px-6 py-2 rounded-xl text-xl mx-[auto]">Exit</button>
        </div>
      ))}
      {holdings.length === 0 && <h1 className='text-2xl text-center my-[auto]'>No holdings currently</h1>}
    </div>
  );
}
