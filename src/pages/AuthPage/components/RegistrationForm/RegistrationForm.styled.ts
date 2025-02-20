import { Box, styled } from '@mui/material';

export const StyledRegisteredFormRoot = styled('form')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(3),
  width: '70%',
  [theme.breakpoints.down('mobile')]: {
    width: '95%',
  },
}));

export const StyledRegisteredFormInputsWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1),
  width: '100%',
  [theme.breakpoints.down('mobile')]: {
    flexDirection: 'column',
  },
}));

export const StyledRegisteredFormButtonsWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1),
  width: '100%',
  marginTop: theme.spacing(1),
  [theme.breakpoints.down('mobile')]: {
    marginTop: theme.spacing(4),
  },
}));
