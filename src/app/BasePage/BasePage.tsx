import React from 'react';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

import {
  StyledBasePageContent,
  StyledBasePageGoBackButton,
  StyledBasePageHeader,
  StyledBasePageRoot,
  StyledBasePageTitle,
} from './BasePage.styled';

type BasePageRootProps = {
  children: React.ReactNode;
};

type BasePageTitleProps = {
  title: string;
};

type BasePageHeaderProps = {
  children: React.ReactNode;
};

type BasePageContentProps = {
  children: React.ReactNode;
};

type BasePageGoBackButtonProps = {
  text: string;
  onClick: VoidFunction;
};

const BasePageRoot: React.FC<BasePageRootProps> = ({ children }) => {
  return <StyledBasePageRoot>{children}</StyledBasePageRoot>;
};

const BasePageHeader: React.FC<BasePageHeaderProps> = ({ children }) => {
  return (
    <StyledBasePageHeader direction="row" alignItems="center" spacing={3}>
      {children}
    </StyledBasePageHeader>
  );
};

const BasePageTitle: React.FC<BasePageTitleProps> = ({ title }) => {
  return <StyledBasePageTitle variant="h5">{title}</StyledBasePageTitle>;
};

const BasePageContent: React.FC<BasePageContentProps> = ({ children }) => {
  return <StyledBasePageContent>{children}</StyledBasePageContent>;
};

const BasePageGoBackButton: React.FC<BasePageGoBackButtonProps> = ({
  onClick,
  text,
}) => {
  return (
    <StyledBasePageGoBackButton
      size="small"
      onClick={onClick}
      variant="text"
      startIcon={<ArrowBackIosNewIcon />}
    >
      {text}
    </StyledBasePageGoBackButton>
  );
};

export const BasePage = {
  Root: BasePageRoot,
  Header: BasePageHeader,
  Title: BasePageTitle,
  Content: BasePageContent,
  GoBack: BasePageGoBackButton,
};
