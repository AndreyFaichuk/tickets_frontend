import React from 'react';

import {
  StyledBaseModal,
  StyledBaseModalBody,
  StyledBaseModalFooter,
  StyledBaseModalHeader,
} from './BaseModal.styled';

export interface BaseModalProps {
  open: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

export interface BaseModalHeaderProps {
  title: string;
}

export interface BaseModalBodyProps {
  children?: React.ReactNode;
}

export interface BaseModalFooterProps {
  actions?: React.ReactNode;
}

const BaseModalRoot: React.FC<BaseModalProps> = ({
  open,
  onClose,
  children,
}) => {
  return (
    <StyledBaseModal open={open} onClose={onClose}>
      {children}
    </StyledBaseModal>
  );
};

const BaseModalHeader: React.FC<BaseModalHeaderProps> = ({ title }) => {
  return <StyledBaseModalHeader>{title}</StyledBaseModalHeader>;
};

const BaseModalBody: React.FC<BaseModalBodyProps> = ({ children }) => {
  return <StyledBaseModalBody>{children}</StyledBaseModalBody>;
};

const BaseModalFooter: React.FC<BaseModalFooterProps> = ({ actions }) => {
  return <StyledBaseModalFooter>{actions}</StyledBaseModalFooter>;
};

export const BaseModal = {
  Root: BaseModalRoot,
  Header: BaseModalHeader,
  Body: BaseModalBody,
  Footer: BaseModalFooter,
};
