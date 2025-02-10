import { FC } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import { StyledDeleteColumnFormRoot } from './DeleteColumnForm.styled';
import {
  deleteColumnSchema,
  DeleteColumnValues,
} from './DeleteColumnForm.schema';
import { Button, Stack, Typography } from '@mui/material';
import { FormSelect } from '../FormSelect';
import { SelectOptions } from '../FormSelect/FormSelect';

type DeleteColumnFormProps = {
  onSubmit: (values: DeleteColumnValues) => void;
  options: SelectOptions;
  columnTitle: string;
  isLoading?: boolean;
  defaultValues?: DeleteColumnValues;
};

export const DeleteColumnForm: FC<DeleteColumnFormProps> = ({
  onSubmit,
  defaultValues,
  columnTitle,
  options,
  isLoading = false,
}) => {
  const methods = useForm<DeleteColumnValues>({
    values: defaultValues,
    resolver: zodResolver(deleteColumnSchema),
  });

  const submit = methods.handleSubmit(onSubmit);

  return (
    <FormProvider {...methods}>
      <StyledDeleteColumnFormRoot onSubmit={submit}>
        <Stack direction="row" justifyContent="space-between">
          <Stack gap={1}>
            <Typography>This column will be delete:</Typography>
            <Typography
              variant="subtitle1"
              sx={{ textDecoration: 'line-through' }}>
              {columnTitle}
            </Typography>
          </Stack>
          <Stack justifyContent="center">
            <ArrowForwardIcon />
          </Stack>
          <Stack gap={1} width="50%">
            <Typography>New placement for Todos:</Typography>
            <FormSelect
              name="moveToDosToColumnId"
              options={options}
              fullWidth
            />
          </Stack>
        </Stack>
        <Stack alignItems="center">
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            disabled={isLoading}>
            Delete column
          </Button>
        </Stack>
      </StyledDeleteColumnFormRoot>
    </FormProvider>
  );
};
