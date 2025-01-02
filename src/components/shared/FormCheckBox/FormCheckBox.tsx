import { Controller, useFormContext } from 'react-hook-form';
import { Checkbox, CheckboxProps, FormControlLabel } from '@mui/material';

type LabelPlacementUnion = 'bottom' | 'top' | 'start' | 'end';

type FormCheckBoxProps = CheckboxProps & {
  name: string;
  label: string;
  labelPlace?: LabelPlacementUnion;
};

export const FormCheckBox = ({
  name,
  label,
  labelPlace = 'end',
  ...rest
}: FormCheckBoxProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormControlLabel
          control={
            <Checkbox
              {...field}
              checked={field.value || false}
              onChange={(e) => field.onChange(e.target.checked)}
              {...rest}
            />
          }
          label={label}
          labelPlacement={labelPlace}
        />
      )}
    />
  );
};
