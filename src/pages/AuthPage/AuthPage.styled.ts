import { Paper, Stack, styled, Typography } from '@mui/material';

export const AuthRoot = styled(Paper)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '40%',
  backgroundColor: theme.palette.secondary.light,
  margin: '0 auto',
  padding: theme.spacing(10),
  gap: theme.spacing(2),
  justifyContent: 'flex-start',
  alignItems: 'center',
}));

export const AuthTitleWrapper = styled(Stack)(() => ({}));
export const AuthTitle = styled(Typography)(() => ({}));
export const AuthSubTitle = styled(Typography)(() => ({}));
