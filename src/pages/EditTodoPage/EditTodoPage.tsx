import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Stack } from '@mui/material';

import { PAGES_MAP } from '../../constants';
import { ToDoForm } from '../../components/shared/ToDoForm/ToDoForm';
import { normalizeFormData } from './EditTodoPage.utils';
import { TodoValues } from '../../components/shared/ToDoForm/ToDoForm.schema';
import { useTodoFetchById } from '../../hooks/useTodoFetchById';
import { useTodoActions } from '../../hooks/useTodoActions';
import { DefaultAppPage } from '../../app/DefaultAppPage';
import { DisplayWithLoader } from '../../components/shared/DisplayWithLoader';
import { StyledEditTodoPageRoot } from './EditTodoPage.styled';
import { useCommentsFetch } from '../../hooks/comments/useCommentsFetch';
import { AddNewComment } from '../../components/shared/CommentsBlock';
import { useGetCurrentUser } from '../../hooks/user/useGetCurrentUser';

export const EditTodoPage = () => {
  const { id = '' } = useParams<{ id: string }>();

  const { currentUser, isCurrentUserLoading } = useGetCurrentUser();

  const { handleUpdateToDo, isUpdatingToDo } = useTodoActions();

  const [defaultValues, setDefaultValues] = useState<TodoValues>();
  const [isNormalizing, setIsNormalizing] = useState<boolean>(true);

  const [activeComment, setIsActiveComment] = useState<string>('');

  const { oneTodo, isOneToDoLoading } = useTodoFetchById(id);
  const { allComments, areAllCommentsLoading } = useCommentsFetch(id);

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

  const isLoading =
    isOneToDoLoading || isNormalizing || !defaultValues || isCurrentUserLoading;

  const handleSubmit = (values: TodoValues) => {
    handleUpdateToDo({
      id,
      todo: {
        description: values.description.trim(),
        name: values.name,
        progress: values.progress,
        priority: values.priority,
        attachments: values.attachments,
      },
    });
  };

  const handleOpenEdit = (commentId: string) => setIsActiveComment(commentId);
  const handleCloseEdit = () => setIsActiveComment('');

  return (
    <DefaultAppPage title={PAGES_MAP.editTodo}>
      <DisplayWithLoader isloading={isLoading}>
        <StyledEditTodoPageRoot direction="row" gap={3}>
          <ToDoForm
            onSubmit={handleSubmit}
            defaultValues={defaultValues}
            isLoading={isUpdatingToDo}
          />
          <Stack flex={1} gap={3} sx={{ maxHeight: '70vh', overflowY: 'auto' }}>
            <DisplayWithLoader isloading={areAllCommentsLoading}>
              {allComments.map((content, i) => {
                const { todoId } = content;

                const key = `${todoId}-${i}`;
                const isActiveComment = activeComment === content.commentId;

                return (
                  <AddNewComment
                    currentUserId={currentUser._id}
                    key={key}
                    content={content}
                    isEditing={isActiveComment}
                    onEdit={handleOpenEdit}
                    onClose={handleCloseEdit}
                  />
                );
              })}
            </DisplayWithLoader>
          </Stack>
        </StyledEditTodoPageRoot>
      </DisplayWithLoader>
    </DefaultAppPage>
  );
};
