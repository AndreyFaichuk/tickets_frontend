import { FC } from 'react';

import { BaseHeader } from '../BaseHeader';
import { StyledDefaultAppHeaderUserMenu } from './DefaultAppHeader.styled';
import trelloIcon from '../../assests/icon/todoList.svg';

import { DefaultUserMenu } from '../DefaultUserMenu';

export const DefaultAppHeader: FC = () => {
  return (
    <>
      <BaseHeader.Root>
        <BaseHeader.Logo logo={trelloIcon} />
        <BaseHeader.Section></BaseHeader.Section>
        <BaseHeader.Section>
          <StyledDefaultAppHeaderUserMenu alignItems="flex-end">
            <DefaultUserMenu />
          </StyledDefaultAppHeaderUserMenu>
        </BaseHeader.Section>
      </BaseHeader.Root>
    </>
  );
};
