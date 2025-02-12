import { Box, Button, Stack, styled } from '@mui/material';

export const StyledTextEditorRoot = styled(Stack)(() => ({
  '& .text-editor__editor:focus': {
    outline: 'none',
    border: 'none',
  },
}));

export const StyledTextEditorMenuRoot = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'baseline',
  gap: theme.spacing(0.5),
}));

export const StyledTextEditorButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'isActive',
})<{ isActive: boolean }>(({ theme, isActive }) => ({
  textTransform: 'none',
  minWidth: 'unset',
  maxHeight: '40px',
  backgroundColor: isActive ? theme.palette.primary.main : 'transparent',
  color: isActive ? theme.palette.primary.contrastText : 'inherit',
  '&:hover': {
    backgroundColor: isActive
      ? theme.palette.primary.dark
      : theme.palette.grey[200],
  },
}));
