import { FC } from 'react';

import { Skeleton } from '@mui/material';

type SkeletonsProps = {
  numbers: number;
  width?: number | string;
  height?: number | string;
};

export const Skeletons: FC<SkeletonsProps> = ({
  numbers,
  height = 300,
  width = 230,
}) => {
  return Array.from({ length: numbers }).map((_, index) => (
    <Skeleton key={index} variant="rectangular" width={width} height={height} />
  ));
};
