import { FC } from 'react';

import SwipeableDrawer from '@mui/material/SwipeableDrawer';

import { useDefaultDrawerOptions } from './DefaultDrawer.hooks';

type DefaultDrawerProps = {
  onClose: VoidFunction;
  onOpen: VoidFunction;
  isOpen: boolean;
};

export const DefaultDrawer: FC<DefaultDrawerProps> = ({
  onClose,
  onOpen,
  isOpen,
}) => {
  const renderDrawerList = useDefaultDrawerOptions({ onClose });

  return (
    <SwipeableDrawer
      anchor="left"
      open={isOpen}
      onClose={onClose}
      onOpen={onOpen}>
      {renderDrawerList()}
    </SwipeableDrawer>
  );
};
