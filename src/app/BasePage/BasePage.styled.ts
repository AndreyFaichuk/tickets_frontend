import { Box, Button, Stack, styled, Typography } from '@mui/material';

export const StyledBasePageRoot = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(6),
}));

export const StyledBasePageTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.secondary.light,
}));

export const StyledBasePageGoBackButton = styled(Button)(({ theme }) => ({
  color: theme.palette.secondary.light,
}));

export const StyledBasePageHeader = styled(Stack)(() => ({}));
export const StyledBasePageContent = styled(Box)(() => ({}));
