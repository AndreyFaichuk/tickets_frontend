import { theme } from '../../../../theme';

export const getProgressColor = (progress: number): string => {
  if (progress < 10) return theme.palette.progress.notStarted;
  if (progress < 30) return theme.palette.progress.justStarted;
  if (progress < 50) return theme.palette.progress.almostMiddle;
  if (progress < 70) return theme.palette.progress.afterMiddle;
  if (progress < 90) return theme.palette.progress.almostFinish;
  return theme.palette.progress.done;
};
