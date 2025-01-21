import { FC, useState } from 'react';

import AddIcon from '@mui/icons-material/Add';

import {
  StyledDnDToDoProviderButton,
  StyledDnDToDoProviderIconButton,
} from './AddNewColumnBlock.styled';
import { SwapComponents } from '../../../../../../components/shared/SwapComponents';
import { Input } from '../../../../../../components/shared/Input';

type AddNewColumnBlock = {
  onAddNewColumnToList: (columnTitle: string) => void;
};

export const AddNewColumnBlock: FC<AddNewColumnBlock> = ({
  onAddNewColumnToList,
}) => {
  const [newColumnTitle, setNewColumnTitle] = useState<string>('');

  const handleChangeNewColumnName = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setNewColumnTitle(e.target.value);
  };

  const handleAddNewColumn = () => {
    if (!newColumnTitle.trim()) {
      handleCancelNewColumn();
      return;
    }

    onAddNewColumnToList(newColumnTitle);
    handleCancelNewColumn();
  };

  const handleCancelNewColumn = () => {
    setNewColumnTitle('');
  };

  return (
    <SwapComponents
      shouldCallAfterClickOutside={handleCancelNewColumn}
      shouldCallAfterApprove={handleAddNewColumn}
      render={({ shouldSwap, handleSwap }) =>
        shouldSwap ? (
          <Input
            autoFocusOnMount
            value={newColumnTitle}
            onChange={handleChangeNewColumnName}
          />
        ) : (
          <StyledDnDToDoProviderButton>
            <StyledDnDToDoProviderIconButton
              onMouseDown={handleSwap}
              type="button"
              size="large"
              color="secondary"
            >
              <AddIcon />
            </StyledDnDToDoProviderIconButton>
          </StyledDnDToDoProviderButton>
        )
      }
    />
  );
};
