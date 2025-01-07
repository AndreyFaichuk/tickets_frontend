import { FC } from 'react';
import { StyledMenuListRoot } from './MenuList.styled';

type MenuListProps = {
  children: React.ReactNode;
};

export const MenuList: FC<MenuListProps> = ({ children }) => {
  return (
    <StyledMenuListRoot direction="column" gap={1}>
      {children}
    </StyledMenuListRoot>
  );
};
