import { Controller, useFormContext } from 'react-hook-form';

import {
  Autocomplete,
  AutocompleteProps,
  Box,
  FormHelperText,
  TextField,
  Typography,
} from '@mui/material';

type SelectOption = {
  value: string;
  label: string;
};

export type SelectOptions = Array<SelectOption>;

type FormSelectWithSearchProps = Omit<
  AutocompleteProps<SelectOption, false, false, false>,
  'renderInput' | 'options' | 'value' | 'onChange'
> & {
  name: string;
  label: string;
  options: SelectOptions;
};

export const FormSelectWithSearch = ({
  name,
  label,
  options,
  ...rest
}: FormSelectWithSearchProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({ field, fieldState: { error } }) => {
        const { onChange, value } = field;
        return (
          <Box>
            <Typography variant="subtitle2" gutterBottom>
              {label}
            </Typography>
            <Autocomplete
              id={`form-select-with-search_${name}`}
              {...rest}
              value={options.find((option) => option.value === value) || null}
              onChange={(_, newValue) => {
                onChange(newValue ? newValue.value : '');
              }}
              options={options}
              getOptionLabel={(option) => option.label}
              isOptionEqualToValue={(option, value) =>
                option.value === value.value
              }
              renderInput={(params) => <TextField {...params} />}
            />
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
