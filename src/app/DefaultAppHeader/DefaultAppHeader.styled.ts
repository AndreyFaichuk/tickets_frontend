import { styled, Button, Stack } from '@mui/material';

export const StyledDefaultAppHeaderButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.light,
}));

export const StyledDefaultAppHeaderUserMenu = styled(Stack)(() => ({}));
