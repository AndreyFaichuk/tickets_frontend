import { Controller, useFormContext } from 'react-hook-form';

import { Box, Typography } from '@mui/material';
import TextField, { TextFieldProps } from '@mui/material/TextField';

type FormTextAreaProps = TextFieldProps & { name: string; label: string };

export const FormTextArea = ({
  name,
  label,
  fullWidth,
  ...rest
}: FormTextAreaProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      {...rest}
      name={name}
      control={control}
      defaultValue=""
      render={({ field, fieldState: { error } }) => (
        <Box sx={{ width: fullWidth ? '100%' : 'unset' }}>
          <Typography variant="subtitle2" gutterBottom>
            {label}
          </Typography>
          <TextField
            {...field}
            multiline
            minRows={4}
            maxRows={4}
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
