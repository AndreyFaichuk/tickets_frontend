import { FC, useState } from 'react';
import {
  StyledCommentsBlockAddSection,
  StyledCommentsBlockRoot,
} from './CommentsBlock.styled';
import { Avatar, Button, Stack, Typography } from '@mui/material';
import { TextEditor } from '../TextEditor';
import { useTextEditorConfig } from './hooks/useTextEditorConfig';

type CommentsBlockProps = { avatarUrl: string };

export const CommentsBlock: FC<CommentsBlockProps> = ({ avatarUrl }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const editor = useTextEditorConfig();

  const handleEdit = () => setIsEditing(true);

  if (!editor) return null;

  const handleCloseEdit = () => {
    editor.commands.clearContent();
    setIsEditing(false);
  };

  const handleSaveComment = () => {
    const content = editor.getHTML();

    handleCloseEdit();

    console.log(content, 'content');
  };

  const getContent = () => {
    if (isEditing) {
      return <TextEditor editor={editor} />;
    }

    return <Typography variant="body2">Add comment...</Typography>;
  };

  return (
    <StyledCommentsBlockRoot>
      <Avatar alt="User Avatar" src={avatarUrl} />
      <StyledCommentsBlockAddSection
        isActiveHover={!isEditing}
        onClick={handleEdit}>
        {getContent()}
      </StyledCommentsBlockAddSection>
      {isEditing && (
        <Stack direction="column" gap={2}>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleSaveComment}>
            Save
          </Button>
          <Button
            variant="contained"
            color="warning"
            onClick={handleCloseEdit}
            type="button">
            Cancel
          </Button>
        </Stack>
      )}
    </StyledCommentsBlockRoot>
  );
};
