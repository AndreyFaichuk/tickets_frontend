import { DrawerOption } from '../DefaultDrawer/DefaultDrawer.types';

export type UserMenuOption = Omit<DrawerOption, 'Icon'>;

export type User = {
  country: string;
  dateOfBirth: Date;
  email: string;
  firstName: string;
  lastName: string;
  _id: string;
  avatarUrl: string;
};
