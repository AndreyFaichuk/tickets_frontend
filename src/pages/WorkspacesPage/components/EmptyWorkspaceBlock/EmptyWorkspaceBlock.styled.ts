import { Box, Paper, Stack, styled, Typography } from '@mui/material';

export const StyledEmptyWorkspaceBlockRoot = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(3),
  padding: theme.spacing(3),
  alignItems: 'center',
}));

export const StyledEmptyWorkspaceBlockTitle = styled(Typography)(
  ({ theme }) => ({
    color: theme.palette.secondary.light,
  }),
);
