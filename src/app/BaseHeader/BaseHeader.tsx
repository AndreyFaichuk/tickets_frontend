import React from 'react';
import { Link } from 'react-router-dom';

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
  href?: string;
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

const BaseHeaderLogo: React.FC<BaseHeaderLogoProps> = ({ logo, href = '' }) => {
  const content = (
    <StyledBaseHeaderLogo>
      <StyledBaseHeaderLogoImg
        src={logo}
        width={62}
        height={62}
        alt="logo"
      />
    </StyledBaseHeaderLogo>
  );

  return <Link to={href}>{content}</Link>;
};

const BaseHeaderSection: React.FC<BaseHeaderSectionProps> = ({ children }) => {
  return <StyledBaseHeaderSection>{children}</StyledBaseHeaderSection>;
};

export const BaseHeader = {
  Root: BaseHeaderRoot,
  Logo: BaseHeaderLogo,
  Section: BaseHeaderSection,
};