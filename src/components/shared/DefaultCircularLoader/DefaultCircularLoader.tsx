import { FC } from 'react';
import { CircularProgress, CircularProgressProps } from '@mui/material';
import { StyledDefaultCircularLoaderRoot } from './DefaultCircularLoader.styled';

type DefaultCircularLoaderProps = CircularProgressProps;

export const DefaultCircularLoader: FC<DefaultCircularLoaderProps> = ({
  size = '200px',
  color = 'secondary',
  ...rest
}) => {
  return (
    <StyledDefaultCircularLoaderRoot>
      <CircularProgress size={size} color={color} {...rest} />
    </StyledDefaultCircularLoaderRoot>
  );
};
