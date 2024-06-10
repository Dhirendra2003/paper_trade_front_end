/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Chart } from "react-google-charts";
import money from './images/moneys 1.svg';
import wallet from './images/wallet.svg';
import growth from './images/growth.svg';
import linechart from './images/linechart.svg'
import candle from './images/candle2.svg'

function convertToLocalTime(timestamps) {

  return timestamps.map((ts) => {
    const date = new Date(ts * 1000); // Convert seconds to milliseconds
    return date.toLocaleTimeString([], {
      hour12: true,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  });
}

export default function Graph(props) {
  const [chartData, setChartData] = useState([]);
  const change = props.stockupdated;
  function setupdatestock(str) { props.setStockUpdate(str) }

  async function fetchData(name, timef) {
    const url = `https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v3/get-chart?interval=${timef}m&symbol=${name}&range=1d&region=IN&includePrePost=false&useYfid=true&includeAdjustedClose=true&events=capitalGain%2Cdiv%2Csplit`;
    const optionsHeaders =   {
      'X-RapidAPI-Key': 'e506f72bf4msh8f283661512e0cep18f545jsn58b81418268e',
      'X-RapidAPI-Host': 'apidojo-yahoo-finance-v1.p.rapidapi.com'
  }
  ;
    try {
      const response = await fetch(url, { method: 'GET', headers: optionsHeaders });
      const result = await response.text();
      const data = JSON.parse(result);
      console.log(data);
      const StockMetaData = data.chart.result[0].meta
      console.log("00000", StockMetaData)
      localStorage.setItem('stockMetaData', JSON.stringify(StockMetaData))
      setupdatestock(change + '1')
      const timestamps = data.chart.result[0].timestamp;
      const localTimeStrings = convertToLocalTime(timestamps);
      const lows = data.chart.result[0].indicators.quote[0].low;
      const closes = data.chart.result[0].indicators.quote[0].close;
      const opens = data.chart.result[0].indicators.quote[0].open;
      const highs = data.chart.result[0].indicators.quote[0].high;

      const chartDataArray = [];
      for (let i = timestamps.length - 1; i > 0; i--) {
        if (lows[i] !== null && closes[i] !== null && opens[i] !== null && highs[i] !== null) {
          chartDataArray.push([localTimeStrings[i], lows[i], closes[i], opens[i], highs[i]]);
        }
      }
      chartDataArray.reverse();
      setChartData(chartDataArray);
    } catch (error) {
      console.error(error);
    }
  }
  const userDataString = localStorage.getItem('user');
  const userDataObject = JSON.parse(userDataString);
  const totalInv='0'
  if(userDataObject.holdings>0){
    userDataObject.holdings.reduce((sum, holding) => sum + holding.total, 0);
  }

  const [timef, setTimef] = useState(5)
  useEffect(() => {
    fetchData(props.stockName, timef);
  }, [props.stockName, timef]);

  const options = {
    title: `${props.stockName}`,
    titleTextStyle: { color: 'white' },
    width: '80%',
    height: '400px',
    backgroundColor: { fill: 'transparent' },
    hAxis: {
      textStyle: { color: 'white' },
      baselineColor: '#FFF',
      titleTextStyle: { color: '#FFF', fontSize: 20 },
      gridlines: { color: '#333', minSpacing: 40 },
    },
    vAxis: {
      textStyle: { color: 'white' },
      baselineColor: '#FFF',
      titleTextStyle: { color: '#FFF', fontSize: 20 },
      gridlines: { color: '#4f4f4f', minSpacing: 20 },
    },
    legend: "none",
    candlestick: {
      risingColor: { strokeWidth: 1, stroke: '#d32f2f', fill: '#d32f2f' },
      fallingColor: { strokeWidth: 1, stroke: '#4caf50', fill: '#4caf50' }, // Green candles and wicks
    },
    series: [
      { color: 'lightgrey', visibleInLegend: true }, {}, {},
      { color: 'red', visibleInLegend: true }
    ]
  };

  const [graphStyle, setGraphStyle] = useState('candle')
  return (
    <div className='rounded-[20px] backdrop-blur-xl bg-white/10 transition-all border-2 border-white/10 overflow-hidden w-[100%] m-5 h-[600px]'>

      <div className='flex place-content-between w-[80%] mx-[10%] mt-5 -mb-5 '>

        <div className='flex text-white gap-4 m-5'>
          <img src={money} className='p-3 bg-white/10 rounded-xl ' alt="" />
          <div className='my-[auto] '>
            <h1 className=''>Liquidity </h1>
            <p className='text-[25px]'>₹{userDataObject.money}</p>
          </div>
        </div>

        <div className='flex text-white gap-4 m-5'>
          <img src={wallet} className='p-3 bg-white/10 rounded-xl ' alt="" />
          <div className='my-[auto] '>
            <h1 className=''>Total invested</h1>
            <p className='text-[25px]'>₹{totalInv}</p>
          </div>
        </div>

        <a href='/analytics' className='flex text-white gap-4 m-5'>
          <img src={growth} className='p-3 bg-white/10 rounded-xl ' alt="" />
          <div className='my-[auto] '>
            <h1 className=''>See Analytics</h1>
           
          </div>
        </a >
      </div>
      {userDataObject.pro &&
        <div className="flex gap-10 place-content-center mt-5 z-100">
          <div className='flex gap-5 place-content-center' >
            <h1 className='text-white text-center my-[auto]'> Chart type </h1>
            <div className=' flex gap-5'>
              <img src={candle} className='h-10 invert border-2 border-black rounded-lg p-1 ' onClick={() => { setGraphStyle('candle'); console.log(graphStyle) }} />

              <img src={linechart} className='h-10 invert border-2 border-black rounded-lg p-1 ' onClick={() => { setGraphStyle('line'); console.log(graphStyle) }} />
            </div>
          </div>
          <div className='flex gap-5 place-content-center' >
            <h1 className='text-white text-center my-[auto]'> Chart Interval </h1>
            <div className=' flex gap-5'>
              <h1 className='w-10 invert border-2 border-black rounded-lg p-1 ' onClick={() => {setTimef(5); console.log(graphStyle) }} >
                5m
              </h1>
              <h1 className='w-10 invert border-2 border-black rounded-lg p-1 ' onClick={() => { setTimef(15); console.log(graphStyle) }} >
                15m
              </h1>
            </div>
          </div>
        </div>
      }
      <div className=' relative'>
      {graphStyle === "candle" &&
        <Chart
          chartType="CandlestickChart"
          data={[["Time", "Low", "Close", "Open", "High"], ...chartData]}
          width="100%"
          height="400px"
          legendToggle
          options={options}
        />
      }
      {graphStyle === "line" &&
        <Chart
          chartType="AreaChart"
          data={[["Time", "Close"], ...chartData.map(dataPoint => [dataPoint[0], dataPoint[2]])]}
          width="100%"
          height="400px"
          legendToggle
          options={options}
        />
      }
      </div>
    </div>
  );
}
