import { useEffect, useState, useRef } from 'react';

export const useProgress = ({ value }: { value: number }) => {
  const [progress, setProgress] = useState(0);
  const prevValueRef = useRef(value);

  useEffect(() => {
    if (value !== prevValueRef.current) {
      setProgress(prevValueRef.current);
    }

    prevValueRef.current = value;

    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= value) {
          clearInterval(timer);
          return value;
        }
        return prevProgress + 1;
      });
    }, 70);

    return () => {
      clearInterval(timer);
    };
  }, [value]);

  return progress;
};
