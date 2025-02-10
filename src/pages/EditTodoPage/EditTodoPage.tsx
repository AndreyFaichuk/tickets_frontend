import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { PAGES_MAP } from '../../constants';
import { ToDoForm } from '../../components/shared/ToDoForm/ToDoForm';
import { normalizeFormData } from './EditTodoPage.utils';
import { TodoValues } from '../../components/shared/ToDoForm/ToDoForm.schema';
import { useTodoFetchById } from '../../hooks/useTodoFetchById';
import { useTodoActions } from '../../hooks/useTodoActions';
import { DefaultAppPage } from '../../app/DefaultAppPage';
import { DisplayWithLoader } from '../../components/shared/DisplayWithLoader';

export const EditTodoPage = () => {
  const { id } = useParams<{ id: string }>();
  const { oneTodo, isOneToDoLoading } = useTodoFetchById(id ?? '');
  const { handleUpdateToDo, isUpdatingToDo } = useTodoActions();

  const [defaultValues, setDefaultValues] = useState<TodoValues>();
  const [isNormalizing, setIsNormalizing] = useState<boolean>(true);

  useEffect(() => {
    const prepareDefaultValues = async () => {
      if (oneTodo) {
        setIsNormalizing(true);
        const defaultValues = await normalizeFormData(oneTodo);

        setDefaultValues(defaultValues);
        setIsNormalizing(false);
      }
    };

    prepareDefaultValues();
  }, [oneTodo]);

  const isLoading = isOneToDoLoading || isNormalizing || !defaultValues;

  const handleSubmit = (values: TodoValues) => {
    handleUpdateToDo({
      id: id ?? '',
      todo: {
        description: values.description.trim(),
        name: values.name,
        progress: values.progress,
        priority: values.priority,
        attachments: values.attachments,
      },
    });
  };

  return (
    <DefaultAppPage title={PAGES_MAP.editTodo}>
      <DisplayWithLoader isloading={isLoading}>
        <ToDoForm
          onSubmit={handleSubmit}
          defaultValues={defaultValues}
          isLoading={isUpdatingToDo}
        />
      </DisplayWithLoader>
    </DefaultAppPage>
  );
};
