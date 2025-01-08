import { Paper, styled } from '@mui/material';

export const StyledBaseColumnRoot = styled(Paper)(({ theme }) => ({
  width: '250px',
  minHeight: '230px',
  position: 'relative',
  padding: theme.spacing(2),
}));
