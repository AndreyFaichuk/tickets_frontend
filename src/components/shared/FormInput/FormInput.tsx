import { Controller, useFormContext } from 'react-hook-form';

import { Box, Typography } from '@mui/material';
import TextField, { TextFieldProps } from '@mui/material/TextField';

type FormInputProps = TextFieldProps & { name: string; label: string };

export const FormInput = ({
  name,
  label,
  fullWidth,
  ...rest
}: FormInputProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({ field, fieldState: { error } }) => (
        <Box sx={{ width: fullWidth ? '100%' : 'unset' }}>
          <Typography variant="subtitle2" gutterBottom>
            {label}
          </Typography>
          <TextField
            id={`form-input_${name}`}
            {...rest}
            {...field}
            variant="outlined"
            fullWidth={fullWidth}
            error={!!error}
            helperText={error ? error.message : ''}
          />
        </Box>
      )}
    />
  );
};
