import { FC, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';

import { BaseHeader } from '../BaseHeader';
import { StyledDefaultAppHeaderButton } from './DefaultAppHeader.styled';
import trelloIcon from '../../assests/icon/todoList.svg';
import { BaseModal } from '../../components/shared/BaseModal';
import { ToDoForm } from '../../components/shared/ToDoForm/ToDoForm';
import { TodoValues } from '../../components/shared/ToDoForm/ToDoForm.schema';
import { useTodoActions } from '../../hooks/useTodoActions';

type DefaultAppHeaderProps = {
  onDrawerOpen: VoidFunction;
};

export const DefaultAppHeader: FC<DefaultAppHeaderProps> = ({
  onDrawerOpen,
}) => {
  const { handleCreateNewToDo } = useTodoActions();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleSubmit = (values: TodoValues) => {
    handleCreateNewToDo({
      description: values.description.trim(),
      name: values.name,
      progress: values.progress,
    });

    handleClose();
  };

  return (
    <>
      <BaseHeader.Root>
        <BaseHeader.Logo logo={trelloIcon} onClick={onDrawerOpen} />
        <BaseHeader.Section>
          <StyledDefaultAppHeaderButton
            onClick={handleOpen}
            variant="contained"
            startIcon={<AddIcon />}>
            Add new
          </StyledDefaultAppHeaderButton>
        </BaseHeader.Section>
      </BaseHeader.Root>

      <BaseModal.Root open={isOpen} onClose={handleClose}>
        <BaseModal.Header title="Create new ToDo" />
        <BaseModal.Body>
          <ToDoForm onSubmit={handleSubmit} />
        </BaseModal.Body>
      </BaseModal.Root>
    </>
  );
};
