import { theme } from '../../../../theme';

export const getProgressColor = (progress: number): string => {
  if (progress < 10) return theme.progress.notStarted;
  if (progress < 30) return theme.progress.justStarted;
  if (progress < 50) return theme.progress.almostMiddle;
  if (progress < 70) return theme.progress.afterMiddle;
  if (progress < 90) return theme.progress.almostFinish;
  return theme.progress.done;
};
