import { styled } from '@mui/material';

export const StyledDefaultAppLayoutContent = styled('main')(() => ({
  display: 'flex',
  flex: 1,
  minHeight: '95vh',
}));

export const StyledDefaultAppLayoutPageContent = styled('section')(
  ({ theme }) => ({
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    overflow: 'auto',
    padding: theme.spacing(4, 2, 2, 2),
    backgroundColor: theme.palette.primary.main,
    justifyContent: 'flex-start',
    borderRadius: theme.shape.borderRadius,
    margin: theme.spacing(1.5),
  }),
);
