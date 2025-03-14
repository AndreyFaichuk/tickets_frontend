import { FC } from 'react';

import { Typography } from '@mui/material';

import {
  CircularProgressWithLabelContent,
  CustomCircularProgress,
} from './CircularProgressWithLabel.styled';
import { CircularProgressWithLabelProps } from './CircularProgressWithLabel.types';

const CircularWithValueLabel: FC<CircularProgressWithLabelProps> = (
  props: CircularProgressWithLabelProps,
) => {
  return (
    <CircularProgressWithLabelContent>
      <CustomCircularProgress
        {...props}
        variant="determinate"
        size="50px"
        thickness={3}
        value={props.progress}
        progress={props.progress}
      />
      <Typography position="absolute" variant="caption">
        {props.progress}%
      </Typography>
    </CircularProgressWithLabelContent>
  );
};

export const CircularProgressWithLabel: FC<CircularProgressWithLabelProps> = (
  props: CircularProgressWithLabelProps,
) => {
  return <CircularWithValueLabel progress={props.progress} />;
};
