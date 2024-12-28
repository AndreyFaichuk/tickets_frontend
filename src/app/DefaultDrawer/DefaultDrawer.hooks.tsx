import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';

import { DrawerOption } from './DefaultDrawer.types';
import { APP_ROUTES } from '../../constants/routes';

export const useDefaultDrawerOptions = ({
  onClose,
}: {
  onClose: VoidFunction;
}) => {
  const navigate = useNavigate();

  const DRAWER_OPTIONS: Array<DrawerOption> = useMemo(() => {
    return [
      {
        title: 'Dashboard',
        Icon: <DashboardIcon />,
        onClick: () => navigate(APP_ROUTES.DEFAULT),
      },
      {
        title: 'Settings',
        Icon: <SettingsIcon />,
        onClick: () => console.log('Settings'),
      },
    ];
  }, []);

  const renderDrawerList = () => (
    <Box sx={{ width: 250 }} role="presentation" onClick={onClose}>
      <List>
        {DRAWER_OPTIONS.map(({ Icon, onClick, title }) => (
          <ListItem onClick={onClick} key={title} disablePadding>
            <ListItemButton>
              <ListItemIcon>{Icon}</ListItemIcon>
              <ListItemText primary={title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return renderDrawerList;
};
