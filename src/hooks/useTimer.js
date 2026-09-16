import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * useTimer – countdown timer hook
 * @param {number} initialSeconds - starting seconds
 * @param {function} onComplete - callback when timer reaches 0
 */
export function useTimer(initialSeconds, onComplete) {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const intervalRef = useRef(null);

  // Reset when initialSeconds changes
  useEffect(() => {
    setSecondsLeft(initialSeconds);
    setIsRunning(false);
    setIsComplete(false);
  }, [initialSeconds]);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSecondsLeft(prev => {
          if (prev <= 1) {
            clearInterval(intervalRef.current);
            setIsRunning(false);
            setIsComplete(true);
            onComplete?.();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning, onComplete]);

  const start = useCallback(() => {
    if (!isComplete) setIsRunning(true);
  }, [isComplete]);

  const pause = useCallback(() => {
    setIsRunning(false);
  }, []);

  const reset = useCallback(() => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setIsComplete(false);
    setSecondsLeft(initialSeconds);
  }, [initialSeconds]);

  const progress = 1 - secondsLeft / initialSeconds;

  return { secondsLeft, isRunning, isComplete, progress, start, pause, reset };
}
