import { Button, IconButton, Paper, styled } from '@mui/material';

export const StyledBaseColumnRoot = styled(Paper)(({ theme }) => ({
  width: '235px',
  minHeight: '215px',
  position: 'relative',
  padding: theme.spacing(1, 1, 2, 1),
  '&:hover .childClass': {
    display: 'block',
  },
}));

export const StyledBaseColumnAddToDoButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.dark,
  marginTop: theme.spacing(1),
}));

export const StyledCloseIconButton = styled(IconButton)(() => ({
  display: 'none',
  position: 'absolute',
  right: '-28px',
  top: '-28px',
}));
