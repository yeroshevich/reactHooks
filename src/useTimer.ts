import { useRef, useState } from "react";

export interface ITimerOptions {
  init: number;
  interval: number;
  direction: "INCREMENT" | "DECREMENT";
  step: number;
}
const defaultOptions: ITimerOptions = {
  init: 0,
  interval: 1000,
  direction: "INCREMENT",
  step: 1
};

export default function useTimer(options: ITimerOptions = defaultOptions) {
  const [seconds, setSeconds] = useState(options.init);
  const [step, setStep] = useState(options.step);
  const timer = useRef<ReturnType<typeof setInterval>>();

  const start = () => {
    if (!timer.current)
      timer.current = setInterval(() => {
        setSeconds((prev) => {
          switch (options.direction) {
            case "INCREMENT":
              return prev + step;
            case "DECREMENT":
              return prev - step;
            default:
              return prev;
          }
        });
      }, options.interval);
  };

  const clearTimer = () => {
    clearInterval(timer.current);
    timer.current = undefined;
  };
  const pause = () => {
    if (timer.current) clearTimer();
  };

  const reset = () => {
    clearTimer();
    setSeconds(options.init);
    start();
  };

  return { seconds, reset, start, pause };
}
