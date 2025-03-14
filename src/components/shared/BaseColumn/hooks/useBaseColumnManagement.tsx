import { useState } from 'react';

import { Box, Button } from '@mui/material';

import { useColumnActions } from '../../../../hooks/columns/useColumnsActions';
import { useColumnsFetch } from '../../../../hooks/columns/useColumnsFetch';
import { useTodoActions } from '../../../../hooks/useTodoActions';
import { BaseModal } from '../../BaseModal';
import { ConfirmationDialog } from '../../ConfirmationDialog';
import { DeleteColumnForm } from '../../DeleteColumnForm';
import { DeleteColumnValues } from '../../DeleteColumnForm/DeleteColumnForm.schema';
import { ToDoForm } from '../../ToDoForm/ToDoForm';
import { TodoValues } from '../../ToDoForm/ToDoForm.schema';
import {
  BASE_COLUMN_MODAL_TYPES,
  BaseColumnModalState,
  BaseColumnModalTypes,
} from '../BaseColumn.constants';

type useBaseColumnManagementProps = {
  columnTitle: string;
  columnId: string;
};

export const useBaseColumnManagement = ({
  columnTitle,
  columnId,
}: useBaseColumnManagementProps) => {
  const { handleDeleteColumn, handleReplaceAllTodosToColumn } =
    useColumnActions();

  const { handleCreateToDo, handleDeleteToDo, isCreatingNewToDo } =
    useTodoActions();

  const { columnsOptions } = useColumnsFetch();

  const COLUMNS_OPTIONS = columnsOptions.filter((column) => {
    return column.label !== columnTitle;
  });

  const [activeTodoId, setActiveTodoId] = useState<string>('');

  const handleSetActiveTodoId = (todoId: string) => setActiveTodoId(todoId);

  const [activeModals, setActiveModals] = useState<BaseColumnModalState>({
    [BASE_COLUMN_MODAL_TYPES.createTodo]: false,
    [BASE_COLUMN_MODAL_TYPES.deleteColumn]: false,
    [BASE_COLUMN_MODAL_TYPES.deleteTodo]: false,
  });

  const openModal = (key: BaseColumnModalTypes) => {
    setActiveModals((prev) => ({ ...prev, [key]: true }));
  };

  const closeModal = (key: BaseColumnModalTypes) => {
    setActiveModals((prev) => ({ ...prev, [key]: false }));
  };

  const handleSubmitCreateNewToDo = (values: TodoValues) => {
    handleCreateToDo({
      newTodo: {
        description: values.description.trim(),
        name: values.name,
        progress: values.progress,
        priority: values.priority,
        attachments: values.attachments,
      },
      columnId,
    });

    closeModal(BASE_COLUMN_MODAL_TYPES.createTodo);
  };

  const handleSubmitDeletingToDoInColumn = () => {
    handleDeleteToDo({ id: activeTodoId, columnId });

    closeModal(BASE_COLUMN_MODAL_TYPES.deleteTodo);
  };

  const handleSubmitDeleteColumn = async (values: DeleteColumnValues) => {
    try {
      const column = await handleReplaceAllTodosToColumn({
        fromColumnId: columnId,
        toColumnId: values.moveToDosToColumnId,
      });

      if (!column) {
        return;
      }

      await handleDeleteColumn(columnId);
      closeModal(BASE_COLUMN_MODAL_TYPES.deleteColumn);
    } catch (error) {
      // empty
    }
  };

  const MODALS: Record<BaseColumnModalTypes, { render: JSX.Element }> = {
    deleteColumn: {
      render: (
        <BaseModal.Root
          open={activeModals.deleteColumn}
          onClose={() => closeModal(BASE_COLUMN_MODAL_TYPES.deleteColumn)}>
          <BaseModal.Header title="Delete column" />
          <BaseModal.Body>
            <DeleteColumnForm
              columnTitle={columnTitle}
              options={COLUMNS_OPTIONS}
              onSubmit={handleSubmitDeleteColumn}
            />
          </BaseModal.Body>
        </BaseModal.Root>
      ),
    },
    createTodo: {
      render: (
        <BaseModal.Root
          open={activeModals.createTodo}
          onClose={() => closeModal(BASE_COLUMN_MODAL_TYPES.createTodo)}>
          <BaseModal.Header title="Create new ToDo" />
          <BaseModal.Body>
            <Box
              sx={{
                width: '100%',
                minWidth: '1200px',
                height: 'max-content',
              }}>
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
                onClick={() => closeModal(BASE_COLUMN_MODAL_TYPES.deleteTodo)}>
                Close
              </Button>
              <Button
                onClick={handleSubmitDeletingToDoInColumn}
                autoFocus
                color="warning">
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
    isCreatingNewToDo,
  };
};
