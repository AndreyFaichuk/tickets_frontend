import { Paper, styled } from '@mui/material';

export const StyledWorkspaceFilterBarRoot = styled(Paper)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(3),
  width: '100%',
}));
