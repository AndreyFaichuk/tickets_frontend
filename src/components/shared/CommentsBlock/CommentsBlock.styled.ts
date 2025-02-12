import { Box, Paper, styled } from '@mui/material';

export const StyledCommentsBlockRoot = styled(Box)(({ theme }) => ({
  display: 'flex',
  width: '100%',
  height: '100%',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  gap: theme.spacing(1.5),
}));

export const StyledCommentsBlockAddSection = styled(Paper, {
  shouldForwardProp: (prop) => prop !== 'isActiveHover',
})<{ isActiveHover: boolean }>(({ theme, isActiveHover }) => ({
  width: '60%',
  minHeight: '80px',
  cursor: 'text',
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(1.5),
  '&:hover': {
    backgroundColor: isActiveHover ? theme.palette.grey[100] : 'none',
  },
}));
