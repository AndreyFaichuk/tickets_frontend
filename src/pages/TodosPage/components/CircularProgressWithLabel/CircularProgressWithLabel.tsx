import { FC } from 'react';
import { Typography } from '@mui/material';

import { CircularProgressWithLabelProps } from './CircularProgressWithLabel.types';
import {
  CircularProgressWithLabelContent,
  CustomCircularProgress,
} from './CircularProgressWithLabel.styled';

import { useProgress } from './hooks';

const CircularWithValueLabel: FC<CircularProgressWithLabelProps> = (
  props: CircularProgressWithLabelProps,
) => {
  return (
    <CircularProgressWithLabelContent>
      <CustomCircularProgress
        {...props}
        variant="determinate"
        size="115px"
        thickness={5}
        value={props.progress}
        progress={props.progress}
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
