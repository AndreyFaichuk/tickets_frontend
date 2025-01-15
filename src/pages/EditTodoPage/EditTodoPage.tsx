import { useParams } from 'react-router-dom';
import { CircularProgress } from '@mui/material';

import { PAGES_MAP } from '../../constants';
import { ToDoForm } from '../../components/shared/ToDoForm/ToDoForm';
import { normalizeFormData } from './EditTodoPage.utils';
import { TodoValues } from '../../components/shared/ToDoForm/ToDoForm.schema';
import { useTodoFetchById } from '../../hooks/useTodoFetchById';
import { useTodoActions } from '../../hooks/useTodoActions';
import { DefaultAppPage } from '../../app/DefaultAppPage';

export const EditTodoPage = () => {
  const { columnId, id } = useParams<{ columnId: string; id: string }>();

  if (!columnId || !id) return null;

  const { oneTodo, isOneToDoLoading } = useTodoFetchById(columnId, id);
  const { handleUpdateToDo } = useTodoActions();

  const isLoading = isOneToDoLoading || !oneTodo;

  const handleSubmit = (values: TodoValues) => {
    handleUpdateToDo({
      columnId,
      id,
      todo: {
        description: values.description.trim(),
        name: values.name,
        progress: values.progress,
      },
    });
  };

  return (
    <DefaultAppPage title={PAGES_MAP.editTodo}>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <ToDoForm
          onSubmit={handleSubmit}
          defaultValues={normalizeFormData(oneTodo)}
        />
      )}
    </DefaultAppPage>
  );
};
