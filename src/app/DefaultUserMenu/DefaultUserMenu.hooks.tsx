import { MenuItem, Typography } from '@mui/material';
import { useAuth } from '../../components/AppEntry/hooks/useAuth';
import { UserMenuOption } from './DefaultUserMenu.types';

export const useDefaultUserMenuOptions = () => {
  const { handleLogout } = useAuth();

  const USER_MENU__OPTIONS: Array<UserMenuOption> = [
    {
      title: 'Logout',
      onClick: () => handleLogout(),
    },
  ];

  const renderUserMenuListItem = () => {
    return USER_MENU__OPTIONS.map(({ onClick, title }) => (
      <MenuItem key={title} onClick={onClick}>
        <Typography sx={{ textAlign: 'center' }}>{title}</Typography>
      </MenuItem>
    ));
  };

  return renderUserMenuListItem;
};
