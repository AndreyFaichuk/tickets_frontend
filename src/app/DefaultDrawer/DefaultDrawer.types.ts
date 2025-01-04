import { Pages } from '../../constants';

export interface DrawerOption {
  title: Pages;
  Icon: React.ReactNode;
  onClick: VoidFunction;
  shouldDivider?: boolean;
}
