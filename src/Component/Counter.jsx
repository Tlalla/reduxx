import React, { useState, useEffect } from 'react';
import "./Counter.css"
const Counter = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timerID;
    if (isRunning) {
      timerID = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(timerID);
  }, [isRunning]);

  const handleStartStop = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
  };

  const handleShowResult = () => {
    alert(`Ölçmənin nəticəsi: ${Math.floor(time / 60)} dəqiqə ${time % 60} saniyə`);
  };

  return (
    <div className='count'>
      <h1>Stopwatch</h1>
      <h2>{Math.floor(time / 60)}:{('0' + (time % 60)).slice(-2)}</h2>
      <div className='buttons'>   
      <button className='btn' onClick={handleStartStop}>
      {isRunning ? 'Stop' : 'Start'}
      </button>
      <button className='btn' onClick={handleReset}>Reset</button>
      </div>
   
    </div>
  );
}

export default Counter;