import { DrawerOption } from '../DefaultDrawer/DefaultDrawer.types';

export interface UserMenuOption extends Omit<DrawerOption, 'Icon'> {}
