import { styled, Box, CircularProgress } from '@mui/material';
import { theme } from '../../../../theme';
import { getProgressColor } from './CircularProgressWithLabel.utils';

export const CircularProgressWithLabelContent = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
}));

export const CustomCircularProgress = styled(CircularProgress, {
  shouldForwardProp: (prop) => prop !== 'progress',
})(({ progress }: { progress?: number }) => ({
  color:
    progress !== undefined
      ? getProgressColor(progress)
      : theme.palette.progress.notStarted,
}));
