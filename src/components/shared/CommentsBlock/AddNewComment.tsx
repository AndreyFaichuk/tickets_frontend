import { FC } from 'react';
import DOMPurify from 'dompurify';

import { Avatar, Box, Button, Stack, Tooltip, Typography } from '@mui/material';
import { TextEditor } from '../TextEditor';
import { useTextEditorConfig } from './hooks/useTextEditorConfig';
import { useCommentsActions } from '../../../hooks/comments/useCommentsActions';
import { Comment as CommentType } from '../CommentsBlock/AddNewComment.types';
import {
  StyledAddNewCommentSection,
  StyledAddNewCommentRoot,
} from './AddNewComment.styled';
import { getFormattedDate, getIsSameDate } from './AddNewComment.utils';

type CommentsBlockProps = {
  currentUserId: string;
  content: CommentType;
  isEditing: boolean;
  onEdit: (commentId: string) => void;
  onClose: VoidFunction;
};

export const AddNewComment: FC<CommentsBlockProps> = ({
  isEditing,
  currentUserId,
  onClose,
  onEdit,
  content: {
    comment,
    commentId,
    createdAt,
    updatedAt,
    todoId,
    user: { avatarUrl, firstName, lastName, userId },
  },
}) => {
  const safeComment = DOMPurify.sanitize(comment);

  const { handleCreateComment, handleDeleteComment, handleUpdateComment } =
    useCommentsActions(todoId);

  const editor = useTextEditorConfig({ comment: safeComment });

  if (!editor) return null;

  const fullName = `${firstName} ${lastName}`;

  const formattedDateCreated = getFormattedDate(createdAt);
  const formattedDateUpdated = getFormattedDate(updatedAt);

  const isSameDate = getIsSameDate(createdAt, updatedAt);

  const shouldShowUserData = createdAt && firstName && lastName;

  const handleEdit = () => {
    if (currentUserId !== userId) return;

    onEdit(commentId);
  };

  const handleCloseEdit = () => {
    editor?.commands.setContent(comment ?? ' ');
    onClose();
  };

  const handleSaveComment = () => {
    const content = editor.getHTML();

    if (!comment) {
      handleCreateComment({ comment: content, todoId });
    } else {
      handleUpdateComment({ comment: content, commentId });
    }

    handleCloseEdit();
  };

  const handleRemoveComment = () => {
    handleDeleteComment(commentId);
  };

  const getContent = () => {
    if (isEditing) {
      return <TextEditor editor={editor} />;
    }

    if (comment && !isEditing) {
      return <Box dangerouslySetInnerHTML={{ __html: safeComment }} flex={1} />;
    }

    return <Typography variant="body2">Add comment...</Typography>;
  };

  return (
    <StyledAddNewCommentRoot>
      <Stack gap={2} width="80%">
        <Stack direction="row" gap={2}>
          <Avatar alt="User Avatar" src={avatarUrl} />
          <Stack gap={2} sx={{ width: '70%' }}>
            {shouldShowUserData && (
              <Stack flexDirection="row" gap={2} alignItems="center">
                <Typography variant="h6">{fullName}</Typography>
                <Typography variant="subtitle2" color="textDisabled">
                  {formattedDateCreated}
                </Typography>
                {!isSameDate && (
                  <Tooltip
                    title={`last edited at ${formattedDateUpdated}`}
                    placement="top">
                    <Typography variant="subtitle2" color="textDisabled">
                      Edited
                    </Typography>
                  </Tooltip>
                )}
              </Stack>
            )}
            <StyledAddNewCommentSection
              isActiveHover={!isEditing}
              onClick={handleEdit}>
              {getContent()}
            </StyledAddNewCommentSection>
            {isEditing && (
              <Stack direction="row" gap={2}>
                <Button variant="text" color="info" onClick={handleSaveComment}>
                  Save
                </Button>
                <Button
                  variant="text"
                  color="warning"
                  onClick={handleCloseEdit}
                  type="button">
                  Cancel
                </Button>
                {comment && (
                  <Button
                    variant="text"
                    color="error"
                    onClick={handleRemoveComment}
                    type="button">
                    Delete
                  </Button>
                )}
              </Stack>
            )}
          </Stack>
        </Stack>
      </Stack>
    </StyledAddNewCommentRoot>
  );
};
