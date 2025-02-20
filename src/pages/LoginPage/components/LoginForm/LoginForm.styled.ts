import { Box, styled } from '@mui/material';

export const StyledLoginFormRoot = styled('form')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(3),
  width: '70%',
  [theme.breakpoints.down('mobile')]: {
    width: '95%',
  },
}));

export const StyledLoginFormInputsWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1),
  width: '100%',
  [theme.breakpoints.down('mobile')]: {
    flexDirection: 'column',
  },
}));
