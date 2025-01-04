import React from 'react';
import { StyledBasePageRoot, StyledBasePageTitle } from './BasePage.styled';

type BasePageRootProps = {
  children: React.ReactNode;
};

type BasePageTitleProps = {
  title: string;
};

const BasePageRoot: React.FC<BasePageRootProps> = ({ children }) => {
  return <StyledBasePageRoot>{children}</StyledBasePageRoot>;
};

const BasePageTitle: React.FC<BasePageTitleProps> = ({ title }) => {
  return <StyledBasePageTitle variant="h5">{title}</StyledBasePageTitle>;
};

export const BasePage = {
  Root: BasePageRoot,
  Title: BasePageTitle,
};
