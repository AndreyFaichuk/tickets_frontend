import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';

import { BaseModal } from '../../../../components/shared/BaseModal';
import { TodoValues } from '../../../../components/shared/ToDoForm/ToDoForm.schema';
import { ToDoForm } from '../../../../components/shared/ToDoForm/ToDoForm';
import { useTodoFetchById } from '../../../../hooks/useTodoFetchById';
import { normalizeFormData } from './EditTodoModal.utils';
import { useTodoActions } from '../../../../hooks/useTodoActions';

export const EditTodoModal = ({
  currentToDoId,
}: {
  currentToDoId: string;
  shouldDisable?: boolean;
}) => {
  const navigate = useNavigate();

  const { oneTodo, isOneToDoLoading } = useTodoFetchById(currentToDoId);
  const { handleUpdateToDo } = useTodoActions();

  const isLoading = isOneToDoLoading || !oneTodo;

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (!currentToDoId) {
      setIsModalOpen(false);
      return;
    }

    setIsModalOpen(true);
  }, [currentToDoId]);

  const handleClose = () => {
    setIsModalOpen(false);
    navigate('/app/todos');
  };
  const handleSubmit = (values: TodoValues) => {
    handleUpdateToDo({
      _id: oneTodo?._id ?? '',
      description: values.description.trim(),
      name: values.name,
      progress: values.progress,
    });

    handleClose();
  };

  return (
    <BaseModal.Root open={isModalOpen} onClose={handleClose}>
      <BaseModal.Header title="Edit ToDo" />
      <BaseModal.Body>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <ToDoForm
            onSubmit={handleSubmit}
            defaultValues={normalizeFormData(oneTodo)}
          />
        )}
      </BaseModal.Body>
    </BaseModal.Root>
  );
};
