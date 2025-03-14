import { FC } from 'react';

import { FormProvider, useForm } from 'react-hook-form';

import { Button, Stack } from '@mui/material';

import { zodResolver } from '@hookform/resolvers/zod';

import { FormAttachmentBlock } from '../FormAttachmentBlock';
import { FormInput } from '../FormInput';
import { FormProgressSlider } from '../FormProgressSlider';
import { FormSelect } from '../FormSelect';
import { FormTextArea } from '../FormTextArea';

import { PRIORITY_OPTIONS } from './ToDoForm.constants';
import { todoSchema, TodoValues } from './ToDoForm.schema';
import { StyledToDoFormRoot, StyledToDoFormSection } from './ToDoForm.styled';

type ToDoFormProps = {
  onSubmit: (values: TodoValues) => void;
  isLoading?: boolean;
  defaultValues?: TodoValues;
};

export const ToDoForm: FC<ToDoFormProps> = ({
  onSubmit,
  defaultValues,
  isLoading = false,
}) => {
  const methods = useForm<TodoValues>({
    values: defaultValues,
    resolver: zodResolver(todoSchema),
  });

  const buttonText = defaultValues ? 'Update ToDo' : 'Create ToDo';

  const submit = methods.handleSubmit(onSubmit);

  const shouldDisableSubmitButton = isLoading || !methods.formState.isDirty;

  return (
    <FormProvider {...methods}>
      <StyledToDoFormRoot onSubmit={submit}>
        <StyledToDoFormSection>
          <Stack direction="row" gap={3} marginBottom={5}>
            <Stack gap={2} width="100%">
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
          </Stack>
          <Stack alignItems="center">
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              disabled={shouldDisableSubmitButton}>
              {buttonText}
            </Button>
          </Stack>
        </StyledToDoFormSection>
      </StyledToDoFormRoot>
    </FormProvider>
  );
};
