import { useState, useRef } from 'react';

const useTimer = () => {
  const [isTimerOn, setIsTimerOn] = useState(false);
  const [seconds, setSeconds] = useState(0);

  const intervalRef = useRef<NodeJS.Timer | null>(null);

  const startTimer = () => {
    setIsTimerOn(true);

    const intervalId = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    intervalRef.current = intervalId;
  };

  const pauseTimer = () => {
    setIsTimerOn(false);
    clearInterval(intervalRef.current as NodeJS.Timeout);
  };

  return {
    isTimerOn,
    seconds,
    setSeconds,
    startTimer,
    pauseTimer,
  };
};

export default useTimer;
