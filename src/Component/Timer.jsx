import { useState, useEffect } from 'react';
import styles from './Timer.module.css';
import { useSelector, useDispatch } from 'react-redux';
import Increment from './Increment';
import Decrement from './Decrement';

const Timer = () => {
  const [inp, setInp] = useState("");
  const [second, setSecond] = useState(0);
  const [minute, setMinute] = useState(0);
  const [hour, setHour] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [recordedTimes, setRecordedTimes] = useState([]);
  
  const num = useSelector(state => state.counter);  
  const dispatch = useDispatch();

  useEffect(() => {
    const totalMinutes = Math.floor(num / 60);
    setHour(totalMinutes);
    setMinute(num % 60);
    setSecond(0);
  }, [num]);

  useEffect(() => {
    let interval;

    if (isRunning) {
      interval = setInterval(() => {
        setSecond((prevSecond) => {
          if (prevSecond === 0) {
            if (minute === 0) {
              if (hour === 0) {
                setIsRunning(true);
                clearInterval(interval);
                return 0;
              } else {
                setHour((prevHour) => prevHour - 1);
                setMinute(59);
                return 59;
              }
            } else {
              setMinute((prevMinute) => prevMinute - 1);
              return 59;
            }
          } else {
            return prevSecond - 1;
          }
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, hour, minute]);

  useEffect(() => {
    const totalMinutes = Number(inp);
    setHour(Math.floor(totalMinutes / 60));
    setMinute(totalMinutes % 60);
    setSecond(0);
  }, [inp]);

  const startTimer = () => {
    if (inp !== "" && Number(inp) > 0) {
      setIsRunning(true);
    } else {
      console.log("Input is empty or invalid");
    }
  };

  const pauseTimer = () => {
    setIsRunning((prevState) => !prevState);

    if (isRunning) {
      const currentTime = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}:${second.toString().padStart(2, "0")}`;
      setRecordedTimes((prevTimes) => [...prevTimes, currentTime]);
    }
  };

  return (
    <div className={styles.timer}>
      <input
        type="number"
        onChange={(e) => {
          setInp(e.target.value.replace(/[^0-9]/g, ""));
        }}
        placeholder="Enter minutes"
      />
      <div className={styles.buttons}>
        <button className={styles.timerbutton} onClick={startTimer}>Start</button>
        <button className={styles.timerbutton} onClick={pauseTimer}>
          {isRunning ? "Pause" : "Resume"}
        </button>
      </div>
      <div className={styles.watch}>
        <div className={styles.timeUnit}>
          <h1>{hour.toString().padStart(2, "0")}</h1>
          <div className={styles.incdec}>
            <Increment onClick={() => setHour(hour + 1)} disabled={isRunning} />
            <Decrement onClick={() => setHour(Math.max(hour - 1, 0))} disabled={isRunning} />
          </div>
        </div>
        <span className={styles.colon}>:</span>
        <div className={styles.timeUnit}>
          <h1>{minute.toString().padStart(2, "0")}</h1>
          <div className={styles.incdec}>
            <Increment onClick={() => setMinute(minute + 1)} disabled={isRunning} />
            <Decrement onClick={() => setMinute(Math.max(minute - 1, 0))} disabled={isRunning} />
          </div>
        </div>
        <span className={styles.colon}>:</span>
        <div className={styles.timeUnit}>
          <h1>{second.toString().padStart(2, "0")}</h1>
          <div className={styles.incdec}>
            <Increment onClick={() => setSecond(second + 1)} disabled={isRunning} />
            <Decrement onClick={() => setSecond(Math.max(second - 1, 0))} disabled={isRunning} />
          </div>
        </div>
      </div>
      <div className={styles.records}>
        <h3>Recorded Times:</h3>
        {recordedTimes.map((time, index) => (
          <p key={index}>{time}</p>
        ))}
      </div>
    </div>
  );
};

export default Timer;
