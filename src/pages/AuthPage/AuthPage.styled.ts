import { Paper, styled } from '@mui/material';

export const AuthRoot = styled(Paper)(({ theme }) => ({
  display: 'flex',
  width: '60%',
  height: '70vh',
  backgroundColor: theme.palette.secondary.light,
  margin: '0 auto',
}));
