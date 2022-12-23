//import { render } from "@testing-library/react";
import React from "react";
//import { ReactDOM } from "react";
import CurrencyConvertor from "./componets/CurrencyConvertor";
import './app.css'

function App(){
  return(
        <div>
            <h1>Currency Convertor</h1>
            <CurrencyConvertor/>
              <div className="eq">=</div>
            <CurrencyConvertor/>
        </div>
    )
}
export default App;

