import React, { useMemo } from 'react';

import { useNavigate } from 'react-router-dom';

import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import {
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from '@mui/material';

import { useAuth } from '@components/AppEntry/hooks/useAuth';

import { ADD_LOGGED_IN_ROUTES } from '../../constants/routes';

import { DrawerOption } from './DefaultDrawer.types';

type useDefaultDrawerOptionsProps = {
  isOpen: boolean;
};

export const useDefaultDrawerOptions = ({
  isOpen,
}: useDefaultDrawerOptionsProps) => {
  const navigate = useNavigate();
  const { handleUserLogout } = useAuth();

  const DRAWER_OPTIONS: Array<DrawerOption> = useMemo(() => {
    return [
      {
        title: 'Dashboard',
        Icon: <DashboardIcon />,
        onClick: () => navigate(ADD_LOGGED_IN_ROUTES.WORKSPACES),
      },
      {
        title: 'Settings',
        Icon: <SettingsIcon />,
        onClick: () => console.log('Settings'),
        shouldDivider: true,
      },
      {
        title: 'Logout',
        Icon: <LogoutIcon />,
        onClick: () => handleUserLogout(),
      },
    ];
  }, [handleUserLogout, navigate]);

  const renderDrawerListItem = () => (
    <>
      {DRAWER_OPTIONS.map(({ Icon, onClick, title, shouldDivider }) => (
        <React.Fragment key={title}>
          {isOpen ? (
            <ListItem onClick={onClick} disablePadding>
              <ListItemButton>
                <ListItemIcon sx={{ margin: '-6px' }}>{Icon}</ListItemIcon>
                <ListItemText primary={title} />
              </ListItemButton>
            </ListItem>
          ) : (
            <Tooltip title={title} placement="right">
              <ListItem onClick={onClick} disablePadding>
                <ListItemButton>
                  <ListItemIcon sx={{ margin: '-6px' }}>{Icon}</ListItemIcon>
                  <ListItemText primary={title} />
                </ListItemButton>
              </ListItem>
            </Tooltip>
          )}
          {shouldDivider && <Divider />}
        </React.Fragment>
      ))}
    </>
  );

  return renderDrawerListItem;
};
