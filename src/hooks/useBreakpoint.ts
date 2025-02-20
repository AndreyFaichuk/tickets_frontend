import { useMediaQuery, useTheme } from '@mui/material';
import { Breakpoint } from '@mui/system';

type CustomBreakpoint = 'mobile' | 'tablet' | 'laptop' | 'desktop';

export const useBreakpoint = (
  query: 'up' | 'down' | 'between' | 'only',
  startBreakpoint: CustomBreakpoint,
  endBreakpoint?: CustomBreakpoint,
): boolean => {
  const theme = useTheme();

  if (query === 'between') {
    if (!endBreakpoint) {
      throw new Error(
        "useBreakpoint: 'between' requires both start and end breakpoints.",
      );
    }
    return useMediaQuery(
      theme.breakpoints.between(
        startBreakpoint as Breakpoint,
        endBreakpoint as Breakpoint,
      ),
    );
  }

  if (query === 'only') {
    return useMediaQuery(theme.breakpoints.only(startBreakpoint as Breakpoint));
  }

  return useMediaQuery(theme.breakpoints[query](startBreakpoint as Breakpoint));
};
