import { Box, Paper, styled, Typography } from '@mui/material';
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
  minHeight: '120px',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  cursor: 'grab',
  gap: theme.spacing(1),
  paddingRight: theme.spacing(1),
}));
