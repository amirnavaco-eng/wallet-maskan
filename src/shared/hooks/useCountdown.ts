"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface UseCountdownResult {
  secondsLeft: number;
  isRunning: boolean;
  restart: () => void;
}

/** Counts down from `initialSeconds` to zero, restartable on demand. */
export function useCountdown(initialSeconds: number): UseCountdownResult {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clear = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const start = useCallback(() => {
    clear();
    intervalRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clear();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [clear]);

  const restart = useCallback(() => {
    setSecondsLeft(initialSeconds);
    start();
  }, [initialSeconds, start]);

  useEffect(() => {
    start();
    return clear;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { secondsLeft, isRunning: secondsLeft > 0, restart };
}
