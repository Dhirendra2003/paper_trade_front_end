// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import logo from './images/Combo.svg'
import search from './images/Search.svg'
import crown from './images/Crown.svg'
import userpfp from './images/userpfp.svg'
//import userContext from './Context';


export default function Topbar(props) {
  const prouser=JSON.parse(localStorage.getItem('user')).pro
  const userDataString = localStorage.getItem('user');
  const userDataObject = JSON.parse(userDataString);
  //const { userObj, updateUser } = useContext(userContext);
  const [searchq, setSearchq] = useState('');
  const [stockList, setStockList] = useState(null);

  async function fetchStockNames(query) {
    const url = `https://apidojo-yahoo-finance-v1.p.rapidapi.com/auto-complete?q=${query}&region=US`;
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '848609c3f4msh50d106083c6db63p140ad3jsn992a28b11242',
        'X-RapidAPI-Host': 'apidojo-yahoo-finance-v1.p.rapidapi.com'
      }
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      // console.log(result.quotes);

      setStockList(result.quotes); // Directly set result.quotes into stockList
      console.log(stockList)
    } catch (error) {
      console.error(error);
    }
  }


  return (
    <div className='  w-full sticky -top-1 z-20 flex place-content-between text-white px-10 align-middle h-20 backdrop-blur-xl bg-black/60 transition-all '>
      <div className='my-[auto] flex scale-[0.7]'>
        <img src={logo} className="invert h-20 my-[auto]" />
        <h1 className='font-bold my-[auto] text-[35px] leading-[0.8] text-purple-500 -top-1 relative pt-4'>Paper <br />Trade</h1>
      </div>
      <div className='my-[auto] scale-[0.7]'>
        <h1 className='text-[40px] mb-2 font-bold'>Hello,{userDataObject.name?userDataObject.name:"User"}</h1>
        <h2 className='text-[20px] -top-6 relative font-bold'>Welcome back</h2>
      </div>

      <div className='relative'>
      <div className='flex my-[auto] scale-[0.9] mt-4'>
        <input type="text" className=' w-96 text-xl text-black h-10 rounded-[20px] p-5 pr-20' placeholder='Stock Name ...' onChange={(event) => { setSearchq(event.target.value) }} />
        <button onClick={() => { console.log(searchq); fetchStockNames(searchq) }}>
          <img src={search} className='invert bg-white h-8 m-1 -left-10 rounded-[20px] relative p-1' />
        </button>
      </div>
       
        {stockList && searchq && (<>
          <div className=" bg-black/70 scale-[0.9]     left-0 w-96 border rounded-b-2xl border-white/50 shadow-lg mt-2 bgblur">
            {/* Render your search result list here */}
            {stockList.map(stock => (
              <div key={stock.symbol} className="p-2 border-b-2 border-white/20 text-center flex bgblur" onClick={() => props.setStockName(stock.symbol)} ><p className='text-lg'>{stock.longname}</p> <p className='ml-[auto] text-white/20 text-sm my-[auto]'>{stock.symbol}</p></div>
            ))}
          </div>
          <div className='bg-blue-400/0 w-[100vw] h-[100vh] fixed top-0 left-0 overflow-hidden z-0 modal' onClick={()=>{setSearchq('')}}> </div>
          </>
        )}
        </div>
        <div className='flex gap-10 scale-[0.8]'>
          {prouser && <img src={crown} className='invert h-10  my-[auto]' />}

          <h1 className='text-[30px] font-bold my-[auto]'>{userDataObject.name}</h1>
          <img src={userpfp} className='h-14 my-[auto]' />
        </div>
      </div>
      )
}


