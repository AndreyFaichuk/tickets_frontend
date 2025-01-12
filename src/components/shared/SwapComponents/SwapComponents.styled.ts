import { Box, Paper, styled } from '@mui/material';

export const StyledSwapComponentsRoot = styled(Paper)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  maxHeight: '90px',
  overflowY: 'auto',
  padding: theme.spacing(0, 1, 0, 1),
}));

export const StyledSwapComponentsActions = styled(Box)(() => ({
  display: 'flex',
  width: '100%',
  justifyContent: 'flex-end',
}));
