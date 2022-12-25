
//import { render } from "@testing-library/react";
import React, { useEffect, useState } from "react";
//import { ReactDOM } from "react";
import CurrencyConvertor from "./componets/CurrencyConvertor";
import './app.css'
//import { Axios } from "axios";

function App(){

console.log(process.env.API_KEY)
const[listCurrency,setCurrency]=useState([])
const [fromCurrency,setFromCurrency]=useState()
const [toCurrency,setToCurrency]=useState()
const [amount,setAmount]=useState(1)
const [amountInFormCurrency,setAmountInFromCurrency]=useState(true)
const[exchangeRate,setExchangeRate]=useState()

function fromOnChangeAmount(e){
  setAmount(e.target.value)
  setAmountInFromCurrency(true)
  }
  function toOnChangeAmount(e){
    setAmount(e.target.value)
    setAmountInFromCurrency(false)
  }

let toAmount,fromAmount
if(amountInFormCurrency){
  fromAmount=amount;
  toAmount=exchangeRate*amount;
}
else{
  console.log(amount)
  console.log(exchangeRate)
  toAmount=amount
  fromAmount=amount/exchangeRate
}

useEffect(()=>{
const myHeaders = new Headers();
myHeaders.append("apikey", "key");
const requestOptions = {
  method: 'GET',
  redirect: 'follow',
  headers: myHeaders
};
fetch("https://api.apilayer.com/exchangerates_data/symbols", requestOptions)
  .then(response => response.text())
  .then(result => {
    
    setCurrency(
    Object.keys(JSON.parse(result).symbols)
    )
      setFromCurrency(Object.keys(JSON.parse(result).symbols)[0])
      setToCurrency(Object.keys(JSON.parse(result).symbols)[0]) 
  })
  .catch(error => console.log('error', error));
  
 },[])

useEffect(()=>{
  const myHeaders = new Headers();
  myHeaders.append("apikey", "key");
  const requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders
  };
  const url=`https://api.apilayer.com/exchangerates_data/convert?to=${toCurrency}&from=${fromCurrency}&amount=1`;
  console.log(url)
  fetch(url, requestOptions)
  .then(response => response.text())
  .then(result =>setExchangeRate(JSON.parse(result).result))
  .catch(error => console.log('error', error));
},[fromCurrency,toCurrency,amount])

  return(
        <div>
            <h1>Currency Convertor</h1>
            {<CurrencyConvertor onChangeAmount={fromOnChangeAmount} amount={fromAmount} listCurrency={listCurrency} onChangeCurrency={(e)=>setFromCurrency(e.target.value)} selectedCurrency={fromCurrency}/>}
              <div className="eq">=</div>
           {<CurrencyConvertor onChangeAmount={toOnChangeAmount} amount={toAmount} listCurrency={listCurrency} onChangeCurrency={(e)=>setToCurrency(e.target.value)} selectedCurrency={toCurrency}/> }
        </div>
    )
}
export default App;

