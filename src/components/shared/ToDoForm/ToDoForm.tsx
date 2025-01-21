import { FC } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { StyledToDoFormRoot, StyledToDoFormSection } from './ToDoForm.styled';
import { FormInput } from '../FormInput';
import { Button, Typography } from '@mui/material';
import { FormTextArea } from '../FormTextArea';
import { FormProgressSlider } from '../FormProgressSlider';
import { todoSchema, TodoValues } from './ToDoForm.schema';
import { FormSelect } from '../FormSelect';
import { PRIORITY_OPTIONS } from './ToDoForm.constants';

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
        <StyledToDoFormSection>
          <FormInput name="name" label="Name" />
          <FormTextArea name="description" label="Description" />

          <>
            <Typography variant="body1">
              Specify the progress of the task by moving the slider
            </Typography>
            <FormProgressSlider name="progress" />
          </>
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            disabled={!methods.formState.isDirty}
          >
            {buttonText}
          </Button>
        </StyledToDoFormSection>
        <StyledToDoFormSection>
          <FormSelect
            variant="filled"
            name="priority"
            options={PRIORITY_OPTIONS}
            label="Priority"
          />
        </StyledToDoFormSection>
      </StyledToDoFormRoot>
    </FormProvider>
  );
};
