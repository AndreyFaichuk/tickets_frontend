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
import { CommentsBlock } from '../../components/shared/CommentsBlock';
import { StyledEditTodoPageRoot } from './EditTodoPage.styled';
import { useGetCurrentUser } from '../../hooks/user/useGetCurrentUser';

export const EditTodoPage = () => {
  const { id } = useParams<{ id: string }>();
  const { currentUser } = useGetCurrentUser();

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
        <StyledEditTodoPageRoot direction="row" gap={3}>
          <ToDoForm
            onSubmit={handleSubmit}
            defaultValues={defaultValues}
            isLoading={isUpdatingToDo}
          />
          <CommentsBlock avatarUrl={currentUser.avatarUrl} />
        </StyledEditTodoPageRoot>
      </DisplayWithLoader>
    </DefaultAppPage>
  );
};
