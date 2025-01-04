import { styled } from '@mui/material';

export const StyledDefaultPublicAppLayoutContent = styled('main')(() => ({
  display: 'flex',
  flex: 1,
  minHeight: '100vh',
}));

export const StyledDefaultPublicAppLayoutPageContent = styled('section')(
  ({ theme }) => ({
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    backgroundColor: theme.palette.primary.main,
    justifyContent: 'center',
  }),
);
