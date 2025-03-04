import { Typography } from '@mui/material';
import { useAuth } from '../../components/AppEntry/hooks/useAuth';
import { UserMenuOption } from './DefaultUserMenu.types';
import { StyledDefaultMenuItem } from './DefaultUserMenu.styled';

export const useDefaultUserMenuOptions = () => {
  const { handleUserLogout } = useAuth();

  const USER_MENU_OPTIONS: Array<UserMenuOption> = [
    {
      title: 'Logout',
      onClick: () => handleUserLogout(),
    },
  ];

  const renderUserMenuListItem = () => {
    return USER_MENU_OPTIONS.map(({ onClick, title }) => (
      <StyledDefaultMenuItem key={title} onClick={onClick}>
        <Typography>{title}</Typography>
      </StyledDefaultMenuItem>
    ));
  };

  return renderUserMenuListItem;
};
