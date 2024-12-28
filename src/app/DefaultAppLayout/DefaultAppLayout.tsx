import React, { useState } from 'react';

import {
  StyledDefaultAppLayoutContent,
  StyledDefaultAppLayoutPageContent,
} from './DefaultAppLayout.styled';

import { DefaultAppHeader } from '../DefaultAppHeader';
import { DefaultDrawer } from '../DefaultDrawer';

export interface DefaultAppLayoutProps {
  children: React.ReactNode;
}

export const DefaultAppLayout: React.FC<DefaultAppLayoutProps> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleDrawerOpen = () => {
    setIsOpen(true);
  };

  const handleDrawerClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <DefaultAppHeader onDrawerOpen={handleDrawerOpen} />
      <DefaultDrawer
        isOpen={isOpen}
        onClose={handleDrawerClose}
        onOpen={handleDrawerOpen}
      />
      <StyledDefaultAppLayoutContent>
        <StyledDefaultAppLayoutPageContent id="app-content">
          {children}
        </StyledDefaultAppLayoutPageContent>
      </StyledDefaultAppLayoutContent>
    </>
  );
};
