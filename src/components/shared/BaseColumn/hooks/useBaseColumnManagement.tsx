import { useState } from 'react';
import {
  BASE_COLUMN_MODAL_TYPES,
  BaseColumnModalState,
  BaseColumnModalTypes,
} from '../BaseColumn.constants';
import { TodoValues } from '../../ToDoForm/ToDoForm.schema';
import { ConfirmationDialog } from '../../ConfirmationDialog';
import { Box, Button } from '@mui/material';
import { BaseModal } from '../../BaseModal';
import { ToDoForm } from '../../ToDoForm/ToDoForm';
import { useColumnActions } from '../../../../hooks/columns/useColumnsActions';
import { useTodoActions } from '../../../../hooks/useTodoActions';

type useBaseColumnManagementProps = {
  columnTitle: string;
  columnId: string;
};

export const useBaseColumnManagement = ({
  columnTitle,
  columnId,
}: useBaseColumnManagementProps) => {
  const { handleDeleteColumn } = useColumnActions();
  const { handleCreateToDo, handleDeleteToDo } = useTodoActions();

  const [activeTodoId, setActiveTodoId] = useState<string>('');

  const handleSetActiveTodoId = (todoId: string) => setActiveTodoId(todoId);

  const [activeModals, setActiveModals] = useState<BaseColumnModalState>({
    [BASE_COLUMN_MODAL_TYPES.createTodo]: false,
    [BASE_COLUMN_MODAL_TYPES.confirmation]: false,
    [BASE_COLUMN_MODAL_TYPES.deleteTodo]: false,
  });

  const openModal = (key: BaseColumnModalTypes) => {
    setActiveModals((prev) => ({ ...prev, [key]: true }));
  };

  const closeModal = (key: BaseColumnModalTypes) => {
    setActiveModals((prev) => ({ ...prev, [key]: false }));
  };

  const handleSubmitCreateNewToDo = (values: TodoValues) => {
    console.log(values, 'values');

    // handleCreateToDo({
    //   newTodo: {
    //     description: values.description.trim(),
    //     name: values.name,
    //     progress: values.progress,
    //     priority: values.priority,
    //   },
    //   columnId,
    // });

    // closeModal(BASE_COLUMN_MODAL_TYPES.createTodo);
  };

  const handleSubmitDeletingToDoInColumn = () => {
    handleDeleteToDo({ id: activeTodoId, columnId });

    closeModal(BASE_COLUMN_MODAL_TYPES.deleteTodo);
  };

  const handleSubmitDeleteColumn = () => {
    handleDeleteColumn(columnId);
    closeModal(BASE_COLUMN_MODAL_TYPES.confirmation);
  };

  const MODALS: Record<BaseColumnModalTypes, { render: JSX.Element }> = {
    confirmation: {
      render: (
        <ConfirmationDialog
          actions={
            <>
              <Button
                onClick={() => closeModal(BASE_COLUMN_MODAL_TYPES.confirmation)}
              >
                Close
              </Button>
              <Button
                onClick={handleSubmitDeleteColumn}
                autoFocus
                color="warning"
              >
                Delete
              </Button>
            </>
          }
          onClose={() => closeModal(BASE_COLUMN_MODAL_TYPES.confirmation)}
          text={`Are you sure that you want to delete column ${columnTitle}? This action can't be undone!`}
          title="Confirm deleting column"
          isOpen={activeModals.confirmation}
        />
      ),
    },
    createTodo: {
      render: (
        <BaseModal.Root
          open={activeModals.createTodo}
          onClose={() => closeModal(BASE_COLUMN_MODAL_TYPES.createTodo)}
        >
          <BaseModal.Header title="Create new ToDo" />
          <BaseModal.Body>
            <Box
              sx={{
                width: '100%',
                minWidth: '1200px',
                height: 'max-content',
              }}
            >
              <ToDoForm onSubmit={handleSubmitCreateNewToDo} />
            </Box>
          </BaseModal.Body>
        </BaseModal.Root>
      ),
    },
    deleteTodo: {
      render: (
        <ConfirmationDialog
          actions={
            <>
              <Button
                onClick={() => closeModal(BASE_COLUMN_MODAL_TYPES.deleteTodo)}
              >
                Close
              </Button>
              <Button
                onClick={handleSubmitDeletingToDoInColumn}
                autoFocus
                color="warning"
              >
                Delete Todo
              </Button>
            </>
          }
          onClose={() => closeModal(BASE_COLUMN_MODAL_TYPES.deleteTodo)}
          text={`Are you sure that you want to delete this Todo? This action can't be undone!`}
          title="Confirm deleting Todo"
          isOpen={activeModals.deleteTodo}
        />
      ),
    },
  };

  return {
    modalsList: MODALS,
    activeModals,
    handlers: {
      openModal,
      onActiveTodoId: handleSetActiveTodoId,
    },
  };
};
