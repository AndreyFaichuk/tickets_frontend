import { CircularProgress } from '@mui/material';

type DisplayWithLoaderProps = {
  isloading: boolean;
  children: React.ReactNode;
};

export const DisplayWithLoader = ({
  isloading,
  children,
}: DisplayWithLoaderProps) => {
  if (isloading) {
    return <CircularProgress size="200px" color="secondary" />;
  }

  return children;
};
