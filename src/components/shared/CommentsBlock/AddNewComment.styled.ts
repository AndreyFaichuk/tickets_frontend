import { Box, Paper, styled } from '@mui/material';

export const StyledAddNewCommentRoot = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  gap: theme.spacing(1.5),
  marginBottom: theme.spacing(2),
}));

export const StyledAddNewCommentSection = styled(Paper, {
  shouldForwardProp: (prop) => prop !== 'isActiveHover',
})<{ isActiveHover: boolean }>(({ theme, isActiveHover }) => ({
  minHeight: '80px',
  cursor: 'text',
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(1.5),
  '&:hover': {
    backgroundColor: isActiveHover ? theme.palette.grey[100] : 'none',
  },
}));
