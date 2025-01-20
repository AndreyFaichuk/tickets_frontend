import { TodoCardActionBlockProps } from './TodoCardActionBlock.types';
import { IconButton, Stack } from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import ModeOutlinedIcon from '@mui/icons-material/ModeOutlined';

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
    <Stack direction="row" justifyContent="flex-end">
      <Stack direction="row">
        <IconButton onClick={handleEdit}>
          <ModeOutlinedIcon />
        </IconButton>
      </Stack>
      <IconButton color="warning" onClick={handleDelete}>
        <DeleteIcon />
      </IconButton>
    </Stack>
  );
};
