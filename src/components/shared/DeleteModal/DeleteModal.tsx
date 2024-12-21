import { FC } from 'react';
import { Button, Stack, Typography } from '@mui/material';

import { BaseModal } from '../BaseModal';
import { BaseModalProps } from '../BaseModal/BaseModal';
import { useTodoActions } from '../../../hooks/useTodoActions';

type DeleteModalProps = BaseModalProps & { id: string };

export const DeleteModal: FC<DeleteModalProps> = ({ id, ...rest }) => {
  const { handleDeleteToDo } = useTodoActions();

  const handleDelete = () => {
    handleDeleteToDo(id);
    rest.onClose();
  };

  return (
    <BaseModal.Root {...rest}>
      <BaseModal.Header title="Delete ToDo" />
      <BaseModal.Body>
        <Stack direction="column" gap={3} alignItems="center">
          <Typography variant="h6">
            Are you sure that you want to delete ToDo with id
          </Typography>
          <Typography>{id} ?</Typography>
        </Stack>
      </BaseModal.Body>
      <BaseModal.Footer
        actions={
          <Button variant="outlined" color="error" onClick={handleDelete}>
            Delete
          </Button>
        }
      />
    </BaseModal.Root>
  );
};
