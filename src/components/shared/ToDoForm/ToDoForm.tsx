import { FC } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { StyledToDoFormRoot, StyledToDoFormSection } from './ToDoForm.styled';
import { FormInput } from '../FormInput';
import { Button, Stack } from '@mui/material';
import { FormTextArea } from '../FormTextArea';
import { FormProgressSlider } from '../FormProgressSlider';
import { todoSchema, TodoValues } from './ToDoForm.schema';
import { FormSelect } from '../FormSelect';
import { PRIORITY_OPTIONS } from './ToDoForm.constants';
import { FormAttachmentBlock } from '../FormAttachmentBlock';

type ToDoFormProps = {
  onSubmit: (values: TodoValues) => void;
  defaultValues?: TodoValues;
};

export const ToDoForm: FC<ToDoFormProps> = ({ onSubmit, defaultValues }) => {
  const methods = useForm<TodoValues>({
    values: defaultValues,
    resolver: zodResolver(todoSchema),
  });

  console.log(defaultValues, 'defaultValues');

  const buttonText = defaultValues ? 'Update ToDo' : 'Create ToDo';

  const submit = methods.handleSubmit(onSubmit);

  return (
    <FormProvider {...methods}>
      <StyledToDoFormRoot onSubmit={submit}>
        <StyledToDoFormSection>
          <Stack direction="row" gap={3} marginBottom={5}>
            <Stack flex={1} gap={2}>
              <Stack direction="row" gap={1} alignItems="center">
                <FormInput name="name" label="Name" fullWidth />
                <FormSelect
                  variant="filled"
                  name="priority"
                  options={PRIORITY_OPTIONS}
                  label="Priority"
                  fullWidth
                />
              </Stack>
              <FormTextArea name="description" label="Description" fullWidth />
              <FormProgressSlider
                name="progress"
                label="Specify the progress of the task by moving the slider"
              />
              <FormAttachmentBlock name="attachments" label="Attachments" />
            </Stack>
            <Stack flex={1} gap={2}></Stack>
          </Stack>
          <Stack alignItems="center">
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              disabled={!methods.formState.isDirty}>
              {buttonText}
            </Button>
          </Stack>
        </StyledToDoFormSection>
      </StyledToDoFormRoot>
    </FormProvider>
  );
};
