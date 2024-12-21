import { FC } from 'react';
import { CircularProgress, Stack, Typography } from '@mui/material';

import { BaseModal } from '../BaseModal';
import { BaseModalProps } from '../BaseModal/BaseModal';
import { useTodoFetchById } from '../../../hooks/useTodoFetchById';

type InfoModalProps = BaseModalProps & { id: string };

export const InfoModal: FC<InfoModalProps> = ({ id, ...rest }) => {
  const { oneTodo, isOneToDoLoading } = useTodoFetchById(id);

  const isLoading = isOneToDoLoading || !oneTodo;

  return (
    <BaseModal.Root {...rest}>
      <BaseModal.Header title="Detailed information" />
      <BaseModal.Body>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <Stack direction="column" gap={2} alignItems="center">
            <Typography>Name: {oneTodo.name}</Typography>
            <Typography>Description: {oneTodo.description}</Typography>
            <Typography>Progress: {oneTodo.progress}%</Typography>
          </Stack>
        )}
      </BaseModal.Body>
    </BaseModal.Root>
  );
};
