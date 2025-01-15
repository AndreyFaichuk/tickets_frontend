import { Box, Paper, styled } from '@mui/material';

export const StyledToDoFormRoot = styled('form')(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  backgroundColor: theme.palette.secondary.light,
  width: '100%',
  height: '100%',
  justifyContent: 'space-between',
  padding: theme.spacing(2),
  borderRadius: '4px',
}));

export const StyledToDoFormMainSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(3),
  justifyContent: 'center',
  flex: 1,
  height: '100%',
}));

export const StyledToDoFormSection = styled(Paper)(({ theme }) => ({
  border: `1px solid ${theme.palette.secondary.dark}`,
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(3),
  justifyContent: 'center',
  flex: 1,
}));
