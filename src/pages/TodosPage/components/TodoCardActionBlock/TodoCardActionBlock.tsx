import DeleteIcon from '@mui/icons-material/Delete';
import ModeOutlinedIcon from '@mui/icons-material/ModeOutlined';
import { Stack } from '@mui/material';

import { StyledTodoCardActionBlockIcon } from './TodoCardActionBlock.styled';
import { TodoCardActionBlockProps } from './TodoCardActionBlock.types';

export const TodoCardActionBlock = ({
  actions,
  currentId,
}: {
  actions: TodoCardActionBlockProps;
  currentId: string;
}) => {
  const handleDelete = () => {
    actions.onDelete();
  };

  const handleEdit = () => {
    actions.onEdit(currentId);
  };

  return (
    <Stack direction="row" justifyContent="space-between">
      <Stack direction="row">
        <StyledTodoCardActionBlockIcon onClick={handleEdit}>
          <ModeOutlinedIcon />
        </StyledTodoCardActionBlockIcon>
      </Stack>
      <StyledTodoCardActionBlockIcon color="warning" onClick={handleDelete}>
        <DeleteIcon />
      </StyledTodoCardActionBlockIcon>
    </Stack>
  );
};
