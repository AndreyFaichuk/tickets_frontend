import { FC } from 'react';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Divider, IconButton, List } from '@mui/material';

import { Drawer, DrawerHeader } from './DefaultDrawer.styled';
import { useDefaultDrawerOptions } from './DefaultDrawer.hooks';

type DefaultDrawerProps = {
  isOpen: boolean;
  onClose: VoidFunction;
  onOpen: VoidFunction;
};

export const DefaultDrawer: FC<DefaultDrawerProps> = ({
  isOpen,
  onClose,
  onOpen,
}) => {
  const renderDrawerListItem = useDefaultDrawerOptions({ isOpen });

  const actionButton = () => {
    if (isOpen) {
      return (
        <IconButton onClick={onClose}>
          <ChevronLeftIcon />
        </IconButton>
      );
    }

    return (
      <IconButton sx={{ margin: '-6px' }} onClick={onOpen}>
        <ChevronRightIcon />
      </IconButton>
    );
  };

  return (
    <Drawer variant="permanent" open={isOpen}>
      <DrawerHeader>{actionButton()}</DrawerHeader>
      <Divider />
      <List>{renderDrawerListItem()}</List>
    </Drawer>
  );
};
