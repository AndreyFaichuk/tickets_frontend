import { FC } from 'react';

import trelloIcon from '@assests/icon/todoList.svg';

import { BaseHeader } from '../BaseHeader';
import { DefaultUserMenu } from '../DefaultUserMenu';

import { StyledDefaultAppHeaderUserMenu } from './DefaultAppHeader.styled';

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
