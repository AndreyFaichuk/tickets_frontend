import { BaseHeader } from '../BaseHeader';

import trelloIcon from '../../assests/icon/todoList.svg';

export const DefaultAppHeader = () => {
  return (
    <>
      <BaseHeader.Root>
        <BaseHeader.Logo logo={trelloIcon}></BaseHeader.Logo>
      </BaseHeader.Root>
    </>
  );
};