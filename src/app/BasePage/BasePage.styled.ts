import { Box, styled, Typography } from '@mui/material';

export const StyledBasePageRoot = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
}));

export const StyledBasePageTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.secondary.light,
}));
