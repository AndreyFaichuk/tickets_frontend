import { Paper, styled } from '@mui/material';

export const StyledPaginatorWithPerPageRoot = styled(Paper)(({ theme }) => ({
  display: 'flex',
  alignItems: 'baseline',
  gap: theme.spacing(5),
  width: '100%',
}));
