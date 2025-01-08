import { Box, IconButton, Paper, styled } from '@mui/material';

export const StyledDnDToDoProviderButton = styled(Box)(() => ({
  display: 'flex',
  height: '70px',
  paddingTop: '30px',
}));

export const StyledDnDToDoProviderNewColumn = styled(Paper)(() => ({
  display: 'flex',
  height: '70px',
  position: 'relative',
}));

export const StyledDnDToDoProviderIconButton = styled(IconButton)(
  ({ theme }) => ({
    borderRadius: '4px',
    border: `1px solid ${theme.palette.secondary.dark}`,
  }),
);
