import React from 'react';

import {
  StyledDefaultAppLayoutContent,
  StyledDefaultAppLayoutPageContent,
} from './DefaultAppLayout.styled';
import { Box } from '@mui/material';

import { DefaultAppHeader } from '../DefaultAppHeader';
import { DefaultDrawer } from '../DefaultDrawer';

export interface DefaultAppLayoutProps {
  children: React.ReactNode;
}

export const DefaultAppLayout: React.FC<DefaultAppLayoutProps> = ({
  children,
}) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Box sx={{ flex: 1 }}>
        <DefaultAppHeader />
        <StyledDefaultAppLayoutContent>
          <DefaultDrawer />
          <StyledDefaultAppLayoutPageContent id="app-content">
            {children}
          </StyledDefaultAppLayoutPageContent>
        </StyledDefaultAppLayoutContent>
      </Box>
    </Box>
  );
};
