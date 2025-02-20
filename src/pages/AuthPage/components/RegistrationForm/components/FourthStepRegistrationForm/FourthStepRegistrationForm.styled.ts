import { Stack, styled } from '@mui/material';

export const FourthStepRegistrationFormRoot = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  justifyContent: 'space-between',
  gap: theme.spacing(2),

  [theme.breakpoints.down('mobile')]: {
    flexDirection: 'column',
  },
}));

export const FourthStepRegistrationFormInputsWrapper = styled(Stack)(
  ({ theme }) => ({
    justifyContent: 'center',
    gap: theme.spacing(2),
    minWidth: '250px',

    [theme.breakpoints.down('mobile')]: {
      flexDirection: 'column',
    },
  }),
);
