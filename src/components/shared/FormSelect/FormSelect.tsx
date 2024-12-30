import { Controller, useFormContext } from 'react-hook-form';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectProps,
} from '@mui/material';

type SelectOption = {
  value: string;
  label: string;
};

export type SelectOptions = Array<SelectOption>;

type FormSelectProps = SelectProps & {
  name: string;
  label: string;
  options: SelectOptions;
};

export const FormSelect = ({
  name,
  label,
  options,
  ...rest
}: FormSelectProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      {...rest}
      name={name}
      control={control}
      defaultValue=""
      render={({ field, fieldState: { error } }) => (
        <FormControl fullWidth error={!!error}>
          <InputLabel id={`${name}-label`}>{label}</InputLabel>
          <Select {...field} labelId={`${name}-label`} id={`${name}-select`}>
            {options.map((option) => {
              return <MenuItem value={option.value}>{option.label}</MenuItem>;
            })}
          </Select>
          {error && <p style={{ color: 'red' }}>{error.message}</p>}
        </FormControl>
      )}
    />
  );
};
