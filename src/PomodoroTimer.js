import React, { useState, useEffect } from 'react';
import './PomodoroTimer.css';

const PomodoroTimer = () => {
  const [sessionLength, setSessionLength] = useState(25);
  const [minutes, setMinutes] = useState(sessionLength);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    setMinutes(sessionLength);
    setSeconds(0);
  }, [sessionLength]);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds((prevSeconds) => prevSeconds - 1);
        } else {
          if (minutes > 0) {
            setMinutes((prevMinutes) => prevMinutes - 1);
            setSeconds(59);
          } else {
            setIsRunning(false);
            // Add any logic to handle when the timer finishes here
          }
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, minutes, seconds]);

  const startTimer = () => {
    setIsRunning(true);
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setMinutes(sessionLength);
    setSeconds(0);
  };

  const handleSessionLengthChange = (event) => {
    const newSessionLength = parseInt(event.target.value);
    setSessionLength(newSessionLength);
  };

  return (
    <div className="pomodoro-container">
      <div className="timer-box">
        <div className="timer">
          {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
        </div>
        <div className="buttons">
          {isRunning ? (
            <button onClick={pauseTimer}>Pause</button>
          ) : (
            <button onClick={startTimer}>Start</button>
          )}
          <button onClick={resetTimer}>Reset</button>
        </div>
      </div>
      <div className="session-box">
        <label>Session Length (minutes):</label>
        <input type="number" min="1" value={sessionLength} onChange={handleSessionLengthChange} />
      </div>
    </div>
  );
};

export default PomodoroTimer;
