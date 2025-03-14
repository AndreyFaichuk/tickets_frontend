import { Box, Paper, Stack, styled, Typography } from '@mui/material';

import { theme } from '../../../../theme';

export const TodoCardRoot = styled(Paper, {
  shouldForwardProp: (prop) => prop !== 'isActiveCard',
})(({ isActiveCard }: { isActiveCard: boolean }) => ({
  width: '215px',
  height: '230px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  gap: theme.spacing(1.5),
  backgroundColor: isActiveCard
    ? theme.palette.primary.main
    : theme.palette.card.medium,
  position: 'relative',
}));

export const TodoCardTypography = styled(Typography)(() => ({
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  WebkitLineClamp: 4,
  textOverflow: 'ellipsis',
}));

export const TodoCardContentWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  minHeight: '100px',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  cursor: 'grab',
  gap: theme.spacing(1),
  paddingRight: theme.spacing(1),
}));

export const TodoCardIconWrapper = styled(Paper)(() => ({
  width: '25px',
  height: '25px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: 'unset',
  position: 'absolute',
  top: '4px',
  right: '4px',
}));

export const TodoCardActionIconWrapper = styled(Stack)(({ theme }) => ({
  marginRight: theme.spacing(1),
}));
