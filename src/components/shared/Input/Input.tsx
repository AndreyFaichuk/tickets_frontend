import React, { useEffect, useRef } from 'react';
import TextField, { TextFieldProps } from '@mui/material/TextField';

type InputProps = TextFieldProps & {
  autoFocusOnMount?: boolean;
};

export const Input: React.FC<InputProps> = ({
  autoFocusOnMount,
  variant = 'standard',
  ...props
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (autoFocusOnMount) {
      const timeoutId = setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 0);

      return () => clearTimeout(timeoutId);
    }
  }, [autoFocusOnMount]);

  return <TextField {...props} variant={variant} inputRef={inputRef} />;
};
