import { FC } from 'react';
import AddIcon from '@mui/icons-material/Add';

import { BaseHeader } from '../BaseHeader';
import {
  StyledDefaultAppHeaderButton,
  StyledDefaultAppHeaderUserMenu,
} from './DefaultAppHeader.styled';
import trelloIcon from '../../assests/icon/todoList.svg';

import { DefaultUserMenu } from '../DefaultUserMenu';

export const DefaultAppHeader: FC = () => {
  return (
    <>
      <BaseHeader.Root>
        <BaseHeader.Logo logo={trelloIcon} />
        <BaseHeader.Section>
          {/* <StyledDefaultAppHeaderButton
            onClick={handleOpen}
            variant="contained"
            startIcon={<AddIcon />}>
            Add new
          </StyledDefaultAppHeaderButton> */}
        </BaseHeader.Section>
        <BaseHeader.Section>
          <StyledDefaultAppHeaderUserMenu alignItems="flex-end">
            <DefaultUserMenu />
          </StyledDefaultAppHeaderUserMenu>
        </BaseHeader.Section>
      </BaseHeader.Root>
    </>
  );
};
