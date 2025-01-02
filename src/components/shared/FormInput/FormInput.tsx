import { Controller, useFormContext } from 'react-hook-form';
import TextField, { TextFieldProps } from '@mui/material/TextField';

type FormInputProps = TextFieldProps & { name: string; label: string };

export const FormInput = ({ name, label, ...rest }: FormInputProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...rest}
          {...field}
          label={label}
          variant="outlined"
          fullWidth
          error={!!error}
          helperText={error ? error.message : ''}
        />
      )}
    />
  );
};
