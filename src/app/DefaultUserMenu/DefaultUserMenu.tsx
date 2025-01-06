import { useState } from 'react';
import { Avatar, IconButton, Menu } from '@mui/material';

import { useDefaultUserMenuOptions } from './DefaultUserMenu.hooks';
import { useGetCurrentUser } from '../../hooks/user/useGetCurrentUser';

export const DefaultUserMenu = () => {
  const { currentUser, isCurrentUserLoading } = useGetCurrentUser();
  const renderUserMenuListItem = useDefaultUserMenuOptions();

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <>
      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
        <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
      </IconButton>
      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}>
        {renderUserMenuListItem()}
      </Menu>
    </>
  );
};
