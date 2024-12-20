import { useEffect, useState } from 'react';

export const useProgress = ({ value }: { value: number }) => {
  const [progress, setProgress] = useState(value);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 0 : prevProgress + 10,
      );
    }, 800);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return progress;
};
