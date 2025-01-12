import { Box, IconButton, styled } from '@mui/material';

export const StyledDnDToDoProviderButton = styled(Box)(() => ({
  display: 'flex',
  height: '70px',
  paddingTop: '30px',
}));

export const StyledDnDToDoProviderIconButton = styled(IconButton)(
  ({ theme }) => ({
    borderRadius: '4px',
    border: `1px solid ${theme.palette.secondary.dark}`,
  }),
);
