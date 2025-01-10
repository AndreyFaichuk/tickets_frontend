import { styled } from '@mui/material';

export const StyledToDoFormRoot = styled('form')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  backgroundColor: theme.palette.secondary.light,
  width: '100%',
  padding: theme.spacing(2),
  borderRadius: '4px',
}));
