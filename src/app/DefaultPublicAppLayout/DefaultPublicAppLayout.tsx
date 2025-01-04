import React from 'react';

import {
  StyledDefaultPublicAppLayoutContent,
  StyledDefaultPublicAppLayoutPageContent,
} from './DefaultPublicAppLayout.styled';

export interface DefaultPublicAppLayoutProps {
  children: React.ReactNode;
}

export const DefaultPublicAppLayout: React.FC<DefaultPublicAppLayoutProps> = ({
  children,
}) => {
  return (
    <StyledDefaultPublicAppLayoutContent>
      <StyledDefaultPublicAppLayoutPageContent id="app-content">
        {children}
      </StyledDefaultPublicAppLayoutPageContent>
    </StyledDefaultPublicAppLayoutContent>
  );
};
