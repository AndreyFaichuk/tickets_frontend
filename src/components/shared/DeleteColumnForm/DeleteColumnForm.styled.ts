import { styled } from '@mui/material';

export const StyledDeleteColumnFormRoot = styled('form')(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(5),
  width: '25vw',
  justifyContent: 'space-between',
  flexDirection: 'column',
  padding: theme.spacing(2),
  borderRadius: '4px',
}));
