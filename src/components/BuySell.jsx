import  { useState, useEffect } from 'react';
import axios from 'axios';

export default function BuySell(props) {
  var emailstr = localStorage.getItem('user');
  var email = JSON.parse(emailstr).mail;
  
  const handleSubmit = (email, symbol,qty,price,total,ttype) => {
    if(tType && total ){ 
    
    console.log(email, symbol,qty,price,total,ttype)
      axios.post('http://localhost:4400/trade',{
        "symbol": symbol,
        "qty": qty,
        "price": (custom? custom:price),
        "total": (custom? custom*qty : total) ,
        "tradeType": ttype,
        "mail": email
      })
        .then(result => {
          console.log(result);
          if (result.data.status === 'success') {
            window.prompt(result.data.msg)
           // updateUser(result.data.user)
            localStorage.setItem('user', JSON.stringify(result.data.user));
            //window.alert(JSON.stringify(result.data.user))
            window.location.href='/portfolio'
          }
          else if (result.data.status === 'wrongpass') {
            window.alert(result.data.msg)
          }
          else if (result.data.status === "no rec") {
            window.alert(result.data.msg)
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
    else{window.alert('select BUY or SELL and Quantity ATLEAST 1')
  }};
  const update=props.stockupdated;
  const [total, setTotal] = useState(0);
  const [stockObj, setStockObj] = useState(null);
  const [totalValue,setTotalValue]=useState(0);
  const [custom, setCustom]=useState();


  useEffect(() => {
    const data = localStorage.getItem('stockMetaData');
    const parsedData = JSON.parse(data);
    setStockObj(parsedData);
  }, [update]);




 
const [tType,setTType]=useState('');
  return (
    <div className='text-white grid w-[30%] place-content-center  m-5 rounded-[20px]  bg-white/10 border-2 border-white/10'>
      <div className='flex flex-col'>
        <h2 className='flex mx-[auto] my-2'>Symbol  :   {stockObj && stockObj.symbol}</h2>
        <h2 className='flex mx-[auto] my-2'>Type  :    {stockObj && stockObj.instrumentType}</h2>
        <h2 className='flex mx-[auto] my-2 text-2xl'>LTP : {stockObj && `${stockObj.currency} ${stockObj.regularMarketPrice}`}</h2>
        <div className='flex m-2'>
        {stockObj && stockObj.instrumentType!=='INDEX' &&
        <>
        <h2>(Custom )Old price:</h2><input onChange={(event)=>{setCustom(event.target.value);console.log(event.target.value)}} type="text" className='rounded-xl p-2 w-24 mx-[auto] bg-white/20 text-white text-center'/>
        </>
  }
        </div>
      </div>
      {stockObj && stockObj.instrumentType!=='INDEX' &&
      <div className='flex gap-2 place-content-center m-5 '>
        <button className={('bg-green-500/40 border-[1px] border-green-500 px-6 py-2 rounded-xl text-xl mx-[auto] '+(tType=='Buy'?'border-[8px]':''))} onClick={()=>{setTType('Buy')}} >Buy</button><br />
        <button className={('bg-red-500/40 border-[1px] border-red-500 px-6 py-2 rounded-xl text-xl mx-[auto] '+(tType=='Sell'?'border-[8px]':''))} onClick={()=>{setTType('Sell')}}>Sell</button><br />
      </div>}
      {stockObj && stockObj.instrumentType!=='INDEX' &&
      <>
      <input type="number" name="" id="" className='rounded-xl p-2 w-24 mx-[auto] bg-white/20 text-white text-center' value={total} onChange={(event) =>{ setTotal(event.target.value);setTotalValue(event.target.value*stockObj.regularMarketPrice)}} min="0" />
      <h1 className='m-[auto] text-[25px] pt-2'>Total : {(total * (stockObj ? stockObj.regularMarketPrice : 0)).toFixed(2)}</h1>
      <button className='bg-sky-500/60 border-[1px] border-sky-300 px-4 py-2 rounded-xl text-xl mx-[auto] my-5' type="submit" onClick={() => {
         if (total == 0) {
           window.alert('you need qty') 
           }
            handleSubmit(email,stockObj.symbol,total,stockObj.regularMarketPrice,totalValue,tType)}}>submit</button>
          </>
          }
    </div>
  );
}