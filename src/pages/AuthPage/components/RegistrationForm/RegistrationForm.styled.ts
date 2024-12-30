import { Box, styled } from '@mui/material';

export const StyledRegisteredFormRoot = styled('form')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(3),
  width: '70%',
}));

export const StyledRegisteredFormInputsWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1),
  width: '100%',
}));

export const StyledRegisteredFormButtonsWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1),
  width: '100%',
  marginTop: theme.spacing(1),
}));
