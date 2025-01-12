import { FC, useState, ReactNode } from 'react';
import { ClickAwayListener, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';

import {
  StyledSwapComponentsActions,
  StyledSwapComponentsRoot,
} from './SwapComponents.styled';

type SwapComponentsProps = {
  render: (options: {
    shouldSwap: boolean;
    handleSwap: () => void;
    handleReset: () => void;
  }) => ReactNode;
  shouldCallAfterApprove?: VoidFunction;
  shouldCallAfterClickOutside?: VoidFunction;
};

export const SwapComponents: FC<SwapComponentsProps> = ({
  render,
  shouldCallAfterClickOutside,
  shouldCallAfterApprove,
}) => {
  const [shouldSwap, setShouldSwap] = useState<boolean>(false);

  const handleSwap = () => setShouldSwap(true);

  const handleReset = () => {
    setShouldSwap(false);

    if (shouldCallAfterClickOutside) shouldCallAfterClickOutside();
  };

  const handleApprove = () => {
    shouldCallAfterApprove && shouldCallAfterApprove();
    handleReset();
  };

  if (!shouldSwap) {
    return <>{render({ shouldSwap, handleSwap, handleReset })}</>;
  }

  return (
    <ClickAwayListener onClickAway={handleReset}>
      <StyledSwapComponentsRoot>
        {render({ shouldSwap, handleSwap, handleReset })}
        <StyledSwapComponentsActions>
          <IconButton onClick={handleApprove}>
            <DoneIcon />
          </IconButton>
          <IconButton onClick={handleReset}>
            <CloseIcon />
          </IconButton>
        </StyledSwapComponentsActions>
      </StyledSwapComponentsRoot>
    </ClickAwayListener>
  );
};
