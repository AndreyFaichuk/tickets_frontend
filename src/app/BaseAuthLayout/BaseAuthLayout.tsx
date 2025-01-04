import {
  StyledBaseAuthContent,
  StyledBaseAuthLayoutRoot,
  StyledBaseAuthSubTitle,
  StyledBaseAuthTitle,
  StyledBaseAuthTitleWrapper,
} from './BaseAuthLayout.styled';

type StyledBaseAuthLayoutRootProps = {
  children?: React.ReactNode;
};

type StyledBaseAuthLayoutTitleProps = {
  title: string;
  subTitle: React.ReactNode;
};

type StyledBaseAuthLayoutContentProps = {
  children: React.ReactNode;
};

const BaseAuthLayoutRoot: React.FC<StyledBaseAuthLayoutRootProps> = ({
  children,
  ...rest
}) => {
  return (
    <StyledBaseAuthLayoutRoot id="app-auth" {...rest}>
      {children}
    </StyledBaseAuthLayoutRoot>
  );
};

const BaseAuthLayoutTitle: React.FC<StyledBaseAuthLayoutTitleProps> = ({
  subTitle,
  title,
}) => {
  return (
    <StyledBaseAuthTitleWrapper direction="column" gap={1} alignItems="center">
      <StyledBaseAuthTitle variant="h4">{title}</StyledBaseAuthTitle>
      <StyledBaseAuthSubTitle variant="body1">
        {subTitle}
      </StyledBaseAuthSubTitle>
    </StyledBaseAuthTitleWrapper>
  );
};

const BaseAuthLayoutContent: React.FC<StyledBaseAuthLayoutContentProps> = ({
  children,
}) => {
  return <StyledBaseAuthContent>{children}</StyledBaseAuthContent>;
};

export const BaseAuthLayout = {
  Root: BaseAuthLayoutRoot,
  Title: BaseAuthLayoutTitle,
  Content: BaseAuthLayoutContent,
};
