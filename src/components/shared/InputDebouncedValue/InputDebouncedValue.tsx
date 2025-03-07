import { ChangeEvent, FC } from 'react';
import { Input, InputProps } from '../Input/Input';
import { useDebouncedValue } from '../../../hooks/useDebouncedValue';

type InputDebouncedValueProps = InputProps & {
  setSearch: (search: string) => void;
  value: string;
};

export const InputDebouncedValue: FC<InputDebouncedValueProps> = ({
  color = 'success',
  variant = 'filled',
  size = 'small',
  label = '',
  value,
  setSearch,
  ...rest
}) => {
  const { currentValue, setCurrentValue } = useDebouncedValue({
    onChange: setSearch,
    defaultValue: value,
  });

  const handleSetDebouncedValue = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    setCurrentValue(e.target.value);
  };

  return (
    <Input
      color={color}
      variant={variant}
      size={size}
      value={currentValue}
      label={label}
      onChange={handleSetDebouncedValue}
      {...rest}
    />
  );
};
