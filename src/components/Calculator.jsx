import React, {useState} from 'react'

import {numbers, operators1, operators2, buttonMapper} from './Buttons'

export default function Calculator() {
  const [result, setResult] = useState('570')
  
  return (
    <div className='calculator'>
      <div className='display'>
        <p className='result'>{result}</p>
      </div>
      <div className='buttons'>
        <div className='operators__top'> 
          {buttonMapper(operators1)}
        </div>
        <div className='numbers'>
          {buttonMapper(numbers)}
        </div>
        <div className='operators__right'>
          {buttonMapper(operators2)}
        </div>
      </div>
    </div>
  )
}
