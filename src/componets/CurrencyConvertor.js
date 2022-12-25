import React from 'react'

function CurrencyConvertor({listCurrency,selectedCurrency,onChangeCurrency,amount,onChangeAmount}) {
  //console.log(`akcnaksln${listCurrency}`)
  return (
    <div>
      <input className='number' type='number' value={amount||1} onChange={onChangeAmount}/>
    <select value={selectedCurrency} onChange={onChangeCurrency}>
        {listCurrency.map(op=>(<option key={op} value={op}>{op}</option>))}
     </select>
    </div>
  )
}

export default CurrencyConvertor