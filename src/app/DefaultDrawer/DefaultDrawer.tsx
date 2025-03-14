import { FC, useState } from 'react';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Divider, IconButton, List } from '@mui/material';

import { useDefaultDrawerOptions } from './DefaultDrawer.hooks';
import { Drawer, DrawerHeader } from './DefaultDrawer.styled';

export const DefaultDrawer: FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleDrawerOpen = () => {
    setIsOpen(true);
  };

  const handleDrawerClose = () => {
    setIsOpen(false);
  };

  const renderDrawerListItem = useDefaultDrawerOptions({ isOpen });

  const actionButton = () => {
    if (isOpen) {
      return (
        <IconButton onClick={handleDrawerClose} id="close-drawer-button">
          <ChevronLeftIcon />
        </IconButton>
      );
    }

    return (
      <IconButton
        sx={{ margin: '-6px' }}
        onClick={handleDrawerOpen}
        id="open-drawer-button">
        <ChevronRightIcon />
      </IconButton>
    );
  };

  return (
    <Drawer variant="permanent" open={isOpen} id="default-drawer">
      <DrawerHeader>{actionButton()}</DrawerHeader>
      <Divider />
      <List>{renderDrawerListItem()}</List>
    </Drawer>
  );
};
