import React, { useState } from 'react';

import {
  StyledDefaultAppLayoutContent,
  StyledDefaultAppLayoutPageContent,
} from './DefaultAppLayout.styled';

import { DefaultAppHeader } from '../DefaultAppHeader';
import { DefaultDrawer } from '../DefaultDrawer';
import { Box } from '@mui/material';

export interface DefaultAppLayoutProps {
  children: React.ReactNode;
  isAuthorized?: boolean;
}

export const DefaultAppLayout: React.FC<DefaultAppLayoutProps> = ({
  children,
  isAuthorized = true,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleDrawerOpen = () => {
    setIsOpen(true);
  };

  const handleDrawerClose = () => {
    setIsOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Box sx={{ flex: 1 }}>
        {isAuthorized && <DefaultAppHeader />}
        <StyledDefaultAppLayoutContent>
          {isAuthorized && (
            <DefaultDrawer
              isOpen={isOpen}
              onClose={handleDrawerClose}
              onOpen={handleDrawerOpen}
            />
          )}
          <StyledDefaultAppLayoutPageContent id="app-content">
            {children}
          </StyledDefaultAppLayoutPageContent>
        </StyledDefaultAppLayoutContent>
      </Box>
    </Box>
  );
};
