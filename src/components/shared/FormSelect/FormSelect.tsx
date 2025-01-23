import { Controller, useFormContext } from 'react-hook-form';
import {
  FormControl,
  MenuItem,
  Select,
  SelectProps,
  ListItemText,
  Stack,
  Box,
  Typography,
} from '@mui/material';

type SelectOption = {
  value: string;
  label: string;
  icon?: string;
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
  fullWidth,
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
        <Box sx={{ width: fullWidth ? '100%' : 'unset' }}>
          <Typography variant="subtitle2" gutterBottom>
            {label}
          </Typography>
          <FormControl fullWidth={fullWidth} error={!!error}>
            <Select
              {...field}
              {...rest}
              id={`${name}-select`}
              renderValue={(selected) => {
                const element = options.find((el) => el.value === selected);

                if (!element?.icon) return <Box>{element?.label}</Box>;

                return (
                  <Stack direction="row" alignItems="center">
                    <img
                      src={element?.icon}
                      style={{
                        width: '20px',
                        height: '20px',
                        marginRight: '8px',
                      }}
                    />
                    {element?.label}
                  </Stack>
                );
              }}
              labelId={`${name}-label`}>
              {options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.icon && (
                    <img
                      src={option.icon}
                      style={{
                        width: '20px',
                        height: '20px',
                        marginRight: '8px',
                      }}
                    />
                  )}
                  <ListItemText primary={option.label} />
                </MenuItem>
              ))}
            </Select>
            {error && <p style={{ color: 'red' }}>{error.message}</p>}
          </FormControl>
        </Box>
      )}
    />
  );
};
