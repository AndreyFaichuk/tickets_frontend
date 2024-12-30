import { Controller, useFormContext } from 'react-hook-form';
import { Autocomplete, AutocompleteProps, TextField } from '@mui/material';

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
      render={({ field }) => {
        const { onChange, value } = field;

        return (
          <Autocomplete
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
            renderInput={(params) => <TextField {...params} label={label} />}
          />
        );
      }}
    />
  );
};
