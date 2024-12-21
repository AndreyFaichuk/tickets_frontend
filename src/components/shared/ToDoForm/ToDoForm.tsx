import { FC } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { StyledToDoFormRoot } from './ToDoForm.styled';
import { FormInput } from '../FormInput';
import { Button, Typography } from '@mui/material';
import { FormTextArea } from '../FormTextArea';
import { FormProgressSlider } from '../FormProgressSlider';
import { todoSchema, TodoValues } from './ToDoForm.schema';

type ToDoFormProps = {
  onSubmit: (values: TodoValues) => void;
  defaultValues?: TodoValues;
};

export const ToDoForm: FC<ToDoFormProps> = ({ onSubmit, defaultValues }) => {
  const methods = useForm<TodoValues>({
    values: defaultValues,
    resolver: zodResolver(todoSchema),
  });

  const buttonText = defaultValues ? 'Update ToDo' : 'Create ToDo';

  const submit = methods.handleSubmit(onSubmit);

  return (
    <FormProvider {...methods}>
      <StyledToDoFormRoot onSubmit={submit}>
        <FormInput name="name" label="Name" />
        <FormTextArea name="description" label="Description" />

        <Typography variant="body1">
          Specify the progress of the task by moving the slider
        </Typography>

        <FormProgressSlider name="progress" />

        <Button
          type="submit"
          variant="contained"
          color="secondary"
          disabled={!methods.formState.isDirty}>
          {buttonText}
        </Button>
      </StyledToDoFormRoot>
    </FormProvider>
  );
};
