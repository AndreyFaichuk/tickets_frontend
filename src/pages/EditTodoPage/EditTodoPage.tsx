import { useEffect, useState } from 'react';
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
  const { id } = useParams<{ id: string }>();
  const { oneTodo, isOneToDoLoading } = useTodoFetchById(id!);
  const { handleUpdateToDo } = useTodoActions();

  const [defaultValues, setDefaultValues] = useState<TodoValues | null>(null);
  const [isNormalizing, setIsNormalizing] = useState<boolean>(true);

  useEffect(() => {
    if (oneTodo) {
      setIsNormalizing(true);
      normalizeFormData(oneTodo).then((values) => {
        setDefaultValues(values);
        setIsNormalizing(false);
      });
    }
  }, [oneTodo]);

  const isLoading = isOneToDoLoading || isNormalizing || !defaultValues;

  const handleSubmit = (values: TodoValues) => {
    handleUpdateToDo({
      id: id!,
      todo: {
        description: values.description.trim(),
        name: values.name,
        progress: values.progress,
        priority: values.priority,
      },
    });
  };

  return (
    <DefaultAppPage title={PAGES_MAP.editTodo}>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <ToDoForm onSubmit={handleSubmit} defaultValues={defaultValues} />
      )}
    </DefaultAppPage>
  );
};
