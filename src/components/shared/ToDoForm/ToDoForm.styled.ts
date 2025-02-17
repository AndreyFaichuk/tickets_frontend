import { Paper, styled } from '@mui/material';

export const StyledToDoFormRoot = styled('form')(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  flex: 1,
  height: '100%',
  justifyContent: 'space-between',
  borderRadius: '4px',
}));

export const StyledToDoFormSection = styled(Paper)(({ theme }) => ({
  border: `1px solid ${theme.palette.secondary.dark}`,
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(3),
  justifyContent: 'space-between',
  flex: 1,
  padding: theme.spacing(2),
}));
