import { FC } from 'react';
import { Typography, CircularProgress } from '@mui/material';

import { CircularProgressWithLabelProps } from './CircularProgressWithLabel.types';
import { CircularProgressWithLabelContent } from './CircularProgressWithLabel.styled';

import { useProgress } from './hooks';

const CircularWithValueLabel: FC<CircularProgressWithLabelProps> = (
  props: CircularProgressWithLabelProps,
) => {
  return (
    <CircularProgressWithLabelContent>
      <CircularProgress
        {...props}
        variant="determinate"
        size="115px"
        thickness={5}
        value={props.progress}
      />
      <Typography position="absolute">{props.progress}%</Typography>
    </CircularProgressWithLabelContent>
  );
};

export const CircularProgressWithLabel: FC<CircularProgressWithLabelProps> = (
  props: CircularProgressWithLabelProps,
) => {
  const progress = useProgress({ value: props.progress });

  return <CircularWithValueLabel progress={progress} />;
};
