import { useState } from 'react';
import {
  BASE_COLUMN_MODAL_TYPES,
  BaseColumnModalState,
  BaseColumnModalTypes,
} from '../BaseColumn.constants';
import { TodoValues } from '../../ToDoForm/ToDoForm.schema';
import { ConfirmationDialog } from '../../ConfirmationDialog';
import { Button } from '@mui/material';
import { BaseModal } from '../../BaseModal';
import { ToDoForm } from '../../ToDoForm/ToDoForm';
import { useColumnActions } from '../../../../hooks/columns/useColumnsActions';

type useBaseColumnManagementProps = {
  columnTitle: string;
  columnId: string;
};

export const useBaseColumnManagement = ({
  columnTitle,
  columnId,
}: useBaseColumnManagementProps) => {
  const { handleDeleteColumn, handleUpdateColumn } = useColumnActions();

  const [activeModals, setActiveModals] = useState<BaseColumnModalState>({
    [BASE_COLUMN_MODAL_TYPES.createTodo]: false,
    [BASE_COLUMN_MODAL_TYPES.confirmation]: false,
  });

  const openModal = (key: BaseColumnModalTypes) => {
    setActiveModals((prev) => ({ ...prev, [key]: true }));
  };

  const closeModal = (key: BaseColumnModalTypes) => {
    setActiveModals((prev) => ({ ...prev, [key]: false }));
  };

  const handleSubmitCreateNewToDo = (values: TodoValues) => {
    handleUpdateColumn({
      card: {
        columnId,
        description: values.description.trim(),
        name: values.name,
        progress: values.progress,
      },
    });

    closeModal(BASE_COLUMN_MODAL_TYPES.createTodo);
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
                onClick={() =>
                  closeModal(BASE_COLUMN_MODAL_TYPES.confirmation)
                }>
                Close
              </Button>
              <Button
                onClick={handleSubmitDeleteColumn}
                autoFocus
                color="warning">
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
          onClose={() => closeModal(BASE_COLUMN_MODAL_TYPES.createTodo)}>
          <BaseModal.Header title="Create new ToDo" />
          <BaseModal.Body>
            <ToDoForm onSubmit={handleSubmitCreateNewToDo} />
          </BaseModal.Body>
        </BaseModal.Root>
      ),
    },
  };

  return {
    modalsList: MODALS,
    activeModals,
    handlers: {
      openModal,
    },
  };
};
