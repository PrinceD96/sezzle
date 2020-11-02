import React, { useState, useEffect } from 'react'
import firebase from 'firebase/app'
import { firestore, auth } from '../../config/Firebase'

import Calculations from '../calculations/Calculations'
import { numbers, operators1, operators2, buttonMapper, isParenthesesNeeded as isPNeeded } from './buttons'
import { engine } from './engine.js'

export default function Calculator() {
  const [num1, setNum1] = useState("0");
  const [num2, setNum2] = useState("");
  const [operator, setOperator] = useState("");
  const [display, setDisplay] = useState("0");
  const [history, setHistory] = useState("");
  const [isResult, setIsResult] = useState(false);
  const [log, setLog] = useState('')
  const [logId, setLogId] = useState('')

  const handleNumberPress = (e) => {
    let value = e.target.textContent;

    if (!operator) {
      value = (num1 === "0" ? "" : isResult ? "" : num1) + value;
      isResult ? setNum2(value) : setNum1(value);
      setIsResult(false);
    } else {
      value = (isResult ? "" : num2) + value;
      setNum2(value);
      setIsResult(false);
    }
  };

  const handleOperatorPress = (e) => {
    let value = e.target.textContent;

    if (value === "C") {
      setNum1("0");
      setNum2("");
      setOperator("");
      setHistory("");
      setIsResult(false);
    } else if (value === "=") {
      if (num1 && operator && num2) {
        let parentheses_open = isPNeeded(operator, value) ? "(" : "";
        let parentheses_close = isPNeeded(operator, value) ? ")" : "";
        let result = engine(num1, operator, num2);
        setHistory((`${parentheses_open}${history} ${operator} ${num2}${parentheses_close}`));
        setNum1(String(result % 1 === 0 ? result : result.toFixed(2)));
        setNum2("");
        setOperator("=");
        setIsResult(true);
      }
    } else if (!operator || (operator && !num2)) {
      let parentheses_open = num2 && isNaN(history) && isPNeeded(operator, value) ? "(" : "";
      let parentheses_close = num2 && isNaN(history) && isPNeeded(operator, value) ? ")" : "";

      setOperator(value);
      setHistory(
        parentheses_open + history + (isResult ? "" : num2 && !operator ? "" : num1) + parentheses_close
      );
    } else {
      if (num2) {
        let parentheses_open = isNaN(history) && isPNeeded(operator, value) ? "(" : "";
        let parentheses_close = isNaN(history) && isPNeeded(operator, value) ? ")" : "";
        let result = engine(num1, operator, num2);

        // If result is float, fix it to 2 decimals
        result = result % 1 === 0 ? result : result.toFixed(2);

        setHistory(`${parentheses_open}${history} ${operator} ${num2}${parentheses_close}`);

        setNum1(String(result));
        setNum2("");
        setOperator(value);
        setIsResult(true);
      }
    }
  };

  const sendLogsToDB = async (log) => {
    try {
      const calculationsRef = firestore.collection('calculations')
      const { uid } = auth.currentUser
      const { id } = await calculationsRef.add({
        calc: log,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        user: uid
      })
      calculationsRef.doc(id).update({ id })
    } catch (error) {
      console.error({ error })
    }
  }

  useEffect(() => {
    setDisplay(num2);
  }, [num2]);

  useEffect(() => {
    setDisplay(num1);
  }, [num1]);

  useEffect(() => {
    setHistory(history => history.replace('/', '÷'))
    setLog(`${history.replace('/', '÷')} = ${num1}`)
  }, [history, num1])

  useEffect(() => {
    if (isResult && log.length > 10) {
      sendLogsToDB(log)
      setLog("")
    }
  }, [isResult, log])

  return (
    <>
      <div className='calculator'>
        <div className='display'>
          <p className="history">{history ? history : ""}</p>
          <p className='result'>{display}</p>
        </div>
        <div className='buttons'>
          <div className='operators__top'>
            {buttonMapper(operators1, operator, handleOperatorPress)}
          </div>
          <div className='numbers'>
            {buttonMapper(numbers, operator, handleNumberPress)}
          </div>
          <div className='operators__right'>
            {buttonMapper(operators2, operator, handleOperatorPress)}
          </div>
        </div>
      </div>
      <Calculations />
    </>
  )
}
