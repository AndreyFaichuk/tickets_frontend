import { Box, Paper, Stack, styled, Typography } from '@mui/material';

export const StyledBaseAuthLayoutRoot = styled(Paper)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '40%',
  backgroundColor: theme.palette.secondary.light,
  margin: '0 auto',
  padding: theme.spacing(10),
  gap: theme.spacing(2),
  justifyContent: 'flex-start',
  alignItems: 'center',
  [theme.breakpoints.down('mobile')]: {
    width: '95%',
    padding: theme.spacing(3, 0, 3, 0),
    margin: theme.spacing(1),
  },
}));

export const StyledBaseAuthContent = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
}));

export const StyledBaseAuthTitleWrapper = styled(Stack)(() => ({}));
export const StyledBaseAuthTitle = styled(Typography)(() => ({}));
export const StyledBaseAuthSubTitle = styled(Typography)(() => ({}));
