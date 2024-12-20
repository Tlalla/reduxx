import React, { useState, useEffect } from 'react';
import "./Watch.css"

const Watch = () => {
  const [time, setTime] = useState({
    hours: new Date().getHours(),
    minutes: new Date().getMinutes(),
    seconds: new Date().getSeconds()
  });

  useEffect(() => {
    const timeLine = setInterval(() => {
      const now = new Date();
      setTime({
        hours: now.getHours(),
        minutes: now.getMinutes(),
        seconds: now.getSeconds()
      });
    }, 1000);

    return () => clearInterval(timeLine);
  }, []);

  return (
    <div className='watch'>
      <h1>
        {time.hours}:{('0' + time.minutes).slice(-2)}:{('0' + time.seconds).slice(-2)}
      </h1>
    </div>
  );
}

export default Watch;