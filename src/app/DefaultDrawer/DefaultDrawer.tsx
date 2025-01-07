import { FC, useState } from 'react';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Divider, IconButton, List } from '@mui/material';

import { Drawer, DrawerHeader } from './DefaultDrawer.styled';
import { useDefaultDrawerOptions } from './DefaultDrawer.hooks';

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
        <IconButton onClick={handleDrawerClose}>
          <ChevronLeftIcon />
        </IconButton>
      );
    }

    return (
      <IconButton sx={{ margin: '-6px' }} onClick={handleDrawerOpen}>
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
