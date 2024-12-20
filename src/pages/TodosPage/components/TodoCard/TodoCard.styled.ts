import { Paper, styled, Typography } from '@mui/material';

export const TodoCardRoot = styled(Paper)(({ theme }) => ({
  width: '230px',
  height: '300px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  gap: theme.spacing(1.5),
  backgroundColor: theme.palette.secondary.light,
}));

export const TodoCardTypography = styled(Typography)(() => ({
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  WebkitLineClamp: 2,
  textOverflow: 'ellipsis',
}));
