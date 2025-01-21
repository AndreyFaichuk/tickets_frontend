import { useState } from 'react';
import {
  Avatar,
  Divider,
  IconButton,
  Menu,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';

import { useDefaultUserMenuOptions } from './DefaultUserMenu.hooks';
import { useGetCurrentUser } from '../../hooks/user/useGetCurrentUser';
import { MenuList } from './components/MenuList';

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

  if (isCurrentUserLoading) {
    return <Skeleton variant="circular" width={40} height={40} />;
  }

  return (
    <Stack direction="row" gap={1} alignItems="center">
      <Typography variant="h6">
        {currentUser.firstName} {currentUser.lastName}
      </Typography>
      <IconButton onClick={handleOpenUserMenu}>
        <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
      </IconButton>
      <Menu
        sx={{ mt: '45px' }}
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
        onClose={handleCloseUserMenu}
      >
        <MenuList>
          <Typography textAlign="center" variant="body2" sx={{ color: 'gray' }}>
            {currentUser.email}
          </Typography>
          <Divider />
          {renderUserMenuListItem()}
        </MenuList>
      </Menu>
    </Stack>
  );
};
