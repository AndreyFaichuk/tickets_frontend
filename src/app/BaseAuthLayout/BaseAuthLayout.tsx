import {
  StyledBaseAuthContent,
  StyledBaseAuthLayoutRoot,
  StyledBaseAuthSubTitle,
  StyledBaseAuthTitle,
  StyledBaseAuthTitleWrapper,
} from './BaseAuthLayout.styled';
import { BASE_AUTH_LAYOUT_ID } from './constants';

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
    <StyledBaseAuthLayoutRoot id={BASE_AUTH_LAYOUT_ID.root} {...rest}>
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
      <StyledBaseAuthTitle id={BASE_AUTH_LAYOUT_ID.title} variant="h4">
        {title}
      </StyledBaseAuthTitle>
      <StyledBaseAuthSubTitle variant="body1" id={BASE_AUTH_LAYOUT_ID.subtitle}>
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
