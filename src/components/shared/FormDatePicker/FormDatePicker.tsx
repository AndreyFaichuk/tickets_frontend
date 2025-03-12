import { Controller, useFormContext } from 'react-hook-form';
import dayjs from 'dayjs';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { Typography, Box, FormHelperText } from '@mui/material';

type DatePickerProps = {
  name: string;
  label: string;
};

export const FormDatePicker = ({ name, label, ...rest }: DatePickerProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      {...rest}
      name={name}
      control={control}
      defaultValue=""
      render={({ field, fieldState: { error } }) => {
        const handleChange = (date: Date) => {
          const formattedDate = dayjs(date).format('YYYY-MM-DD');

          field.onChange(formattedDate);
        };

        const value = field.value ? dayjs(field.value) : null;

        return (
          <Box
            display="flex"
            flexDirection="column"
            gap={1}
            id={`form-dateCalendar_${name}`}>
            <Typography variant="subtitle2">{label}</Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateCalendar
                {...field}
                value={value}
                onChange={handleChange}
                sx={{
                  backgroundColor: 'rgb(238, 242, 239)',
                  margin: 'unset',
                  borderRadius: '4px',
                }}
                referenceDate={dayjs('2022-04-17')}
                views={['year', 'month', 'day']}
              />
            </LocalizationProvider>
            {error && (
              <FormHelperText error sx={{ marginTop: '4px' }}>
                {error.message}
              </FormHelperText>
            )}
          </Box>
        );
      }}
    />
  );
};
