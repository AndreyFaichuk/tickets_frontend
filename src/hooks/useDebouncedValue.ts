import { useEffect, useRef, useState } from 'react';

type useDebouncedValue = {
  onChange: (value: string) => void;
  defaultValue?: string;
  delay?: number;
};

export const useDebouncedValue = ({
  onChange,
  defaultValue = '',
  delay = 500,
}: useDebouncedValue) => {
  const [currentValue, setCurrentValue] = useState<string>(defaultValue);

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      onChange(currentValue);
    }, delay);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [delay, currentValue]);

  return { currentValue, setCurrentValue };
};
