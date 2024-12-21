import { Controller, useFormContext } from 'react-hook-form';
import TextField, { TextFieldProps } from '@mui/material/TextField';

type FormTextAreaProps = TextFieldProps & { name: string; label: string };

export const FormTextArea = ({ name, label, ...rest }: FormTextAreaProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      {...rest}
      name={name}
      control={control}
      defaultValue=""
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          multiline
          minRows={4}
          maxRows={4}
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
