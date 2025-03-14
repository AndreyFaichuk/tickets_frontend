import { Controller, useFormContext } from 'react-hook-form';

import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';

const MAX = 100;
const MIN = 0;
const marks = [
  {
    value: MIN,
    label: '',
  },
  {
    value: MAX,
    label: '',
  },
];

type FormSliderProps = {
  name: string;
  label: string;
  disabled?: boolean;
};

export const FormProgressSlider = ({
  name,
  label,
  disabled = false,
}: FormSliderProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={MIN}
      render={({ field, fieldState: { error } }) => (
        <Box>
          <Typography variant="subtitle2" gutterBottom>
            {label}
          </Typography>
          <Slider
            {...field}
            marks={marks}
            step={1}
            value={field.value}
            valueLabelDisplay="auto"
            min={MIN}
            max={MAX}
            disabled={disabled}
            onChange={(_, newValue) => field.onChange(newValue)}
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography
              variant="subtitle2"
              onClick={() => field.onChange(MIN)}
              sx={{ cursor: 'pointer' }}>
              Not started
            </Typography>
            <Typography
              variant="subtitle2"
              onClick={() => field.onChange(MAX)}
              sx={{ cursor: 'pointer' }}>
              Completed
            </Typography>
          </Box>
          {error && (
            <Typography color="error" sx={{ mt: 1 }}>
              {error.message}
            </Typography>
          )}
        </Box>
      )}
    />
  );
};
