import { useState,useEffect } from "react";

export function useTimer(initialTime, onComplete) {
  const [time, setTime] = useState(initialTime);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running || time <= 0) return;

    const interval = setInterval(() => {
      setTime(t => t - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [running, time]);

  useEffect(() => {
    if (time === 0) onComplete();
  }, [time]);

  return { time, setTime, running, setRunning };
}
