'use client'
import React, { useRef, useState } from 'react';

function Home() {
  const startTime = useRef(0);
  const intervalRef = useRef(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [laps, setLaps] = useState([]);

  const startTimer = () => {
    if (intervalRef.current === 0) {
      startTime.current = Date.now() - currentTime;
      intervalRef.current = setInterval(() => {
        setCurrentTime(Date.now() - startTime.current);
      }, 10);
    }
  };

  const stopTimer = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = 0;
  };

  const lapTimer = () => {
    if (intervalRef.current !== 0) {
      const newLap = (currentTime / 1000).toFixed(3);
      setLaps((prevLaps) => [...prevLaps, newLap]);
    }
  };

  const resetTimer = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = 0;
    setCurrentTime(0);
    setLaps([]);
  };

  return (
    <div id="main">
      <section>
        <h1 className='seconds-elapsed'>{(currentTime / 1000).toFixed(3)}</h1>
        <section className='buttons'>
          <button className="start-btn" onClick={startTimer}>START</button>
          <button className="stop-btn" onClick={stopTimer}>STOP</button>
          <button className="lap-btn" onClick={lapTimer}>LAP</button>
          <button className="reset-btn" onClick={resetTimer}>RESET</button>
        </section>
      </section>
      <section className='lap-section'>
        <h2>Laps</h2>
        <section className='laps'>
          {laps.map((lap, index) => (
            <p key={index}>{lap}</p>
          ))}
        </section>
      </section>
    </div>
  );
}

export default Home;
