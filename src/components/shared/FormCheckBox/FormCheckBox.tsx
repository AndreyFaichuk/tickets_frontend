import { Controller, useFormContext } from 'react-hook-form';
import { Checkbox, CheckboxProps, FormControlLabel } from '@mui/material';

type labelPlacementUnion = 'bottom' | 'top' | 'start' | 'end';

type FormCheckBoxProps = CheckboxProps & {
  name: string;
  label: string;
  labelPlace?: labelPlacementUnion;
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
      {...rest}
      name={name}
      control={control}
      defaultValue={false}
      render={({ field, fieldState: { error } }) => (
        <FormControlLabel
          {...field}
          control={<Checkbox />}
          label={label}
          labelPlacement={labelPlace}
        />
      )}
    />
  );
};
