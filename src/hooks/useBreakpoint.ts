import { useMediaQuery, useTheme } from '@mui/material';
import { Breakpoint } from '@mui/system';

type CustomBreakpoint = 'mobile' | 'tablet' | 'laptop' | 'desktop';

export const useBreakpoint = (
  query: 'up' | 'down' | 'between' | 'only',
  startBreakpoint: CustomBreakpoint,
  endBreakpoint?: CustomBreakpoint,
): boolean => {
  const theme = useTheme();

  const getBreakpointQuery = () => {
    switch (query) {
      case 'between':
        if (!endBreakpoint) {
          throw new Error(
            "useBreakpoint: 'between' requires both start and end breakpoints.",
          );
        }
        return theme.breakpoints.between(
          startBreakpoint as Breakpoint,
          endBreakpoint as Breakpoint,
        );
      case 'only':
        return theme.breakpoints.only(startBreakpoint as Breakpoint);
      default:
        return theme.breakpoints[query](startBreakpoint as Breakpoint);
    }
  };

  return useMediaQuery(getBreakpointQuery());
};
