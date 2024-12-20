import React from 'react';

import {
  StyledDefaultAppLayoutContent,
  StyledDefaultAppLayoutPageContent,
} from './DefaultAppLayout.styled';

import { DefaultAppHeader } from '../DefaultAppHeader';

export interface DefaultAppLayoutProps {
  children: React.ReactNode;
}

export const DefaultAppLayout: React.FC<DefaultAppLayoutProps> = ({
  children,
}) => {
  return (
    <>
      <DefaultAppHeader />
      <StyledDefaultAppLayoutContent>
        <StyledDefaultAppLayoutPageContent id="app-content">
          {children}
        </StyledDefaultAppLayoutPageContent>
      </StyledDefaultAppLayoutContent>
    </>
  );
};