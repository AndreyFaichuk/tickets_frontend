import React from 'react';

import {
  StyledBaseHeaderRoot,
  StyledBaseHeaderSection,
  StyledBaseHeaderLogo,
  StyledBaseHeaderLogoImg,
} from './BaseHeader.styled';

export interface BaseHeaderProps {
  children?: React.ReactNode;
}

export interface BaseHeaderLogoProps {
  logo?: string;
  onClick?: VoidFunction;
}

export interface BaseHeaderSectionProps {
  children?: React.ReactNode;
}

const BaseHeaderRoot: React.FC<BaseHeaderProps> = ({ children, ...rest }) => {
  return (
    <StyledBaseHeaderRoot id="app-header" {...rest}>
      {children}
    </StyledBaseHeaderRoot>
  );
};

const BaseHeaderLogo: React.FC<BaseHeaderLogoProps> = ({ logo, onClick }) => {
  return (
    <StyledBaseHeaderLogo onClick={onClick}>
      <StyledBaseHeaderLogoImg src={logo} width={62} height={62} alt="logo" />
    </StyledBaseHeaderLogo>
  );
};

const BaseHeaderSection: React.FC<BaseHeaderSectionProps> = ({ children }) => {
  return <StyledBaseHeaderSection>{children}</StyledBaseHeaderSection>;
};

export const BaseHeader = {
  Root: BaseHeaderRoot,
  Logo: BaseHeaderLogo,
  Section: BaseHeaderSection,
};
