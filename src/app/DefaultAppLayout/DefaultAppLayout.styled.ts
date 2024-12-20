import { styled } from '@mui/material';

export const StyledDefaultAppLayoutContent = styled('main')(() => ({
  display: 'flex',
  flex: 1,
  overflow: 'hidden',
  height: '93vh',
}));

export const StyledDefaultAppLayoutPageContent = styled('section')(
  ({ theme }) => ({
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    overflow: 'auto',
    padding: theme.spacing(4, 2, 2, 2),
    backgroundColor: theme.palette.primary.main,
  }),
);