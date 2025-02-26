import { FC } from 'react';

import AddIcon from '@mui/icons-material/Add';

import {
  StyledDnDToDoProviderButton,
  StyledDnDToDoProviderIconButton,
} from './AddNewColumnBlock.styled';
import { SwapButtonComponent } from '../../../../../../components/shared/SwapButtonComponent';
import { useColumnActions } from '../../../../../../hooks/columns/useColumnsActions';

type AddNewColumnBlockProps = {
  workspaceId: string;
};

export const AddNewColumnBlock: FC<AddNewColumnBlockProps> = ({
  workspaceId,
}) => {
  const { handleCreateNewColumn } = useColumnActions();

  const handleAddNewColumn = (title: string) => {
    handleCreateNewColumn({ title, workspaceId });
  };

  return (
    <SwapButtonComponent onApprove={handleAddNewColumn}>
      {(handleSwap) => (
        <StyledDnDToDoProviderButton>
          <StyledDnDToDoProviderIconButton
            onMouseDown={handleSwap}
            type="button"
            size="large"
            color="secondary">
            <AddIcon />
          </StyledDnDToDoProviderIconButton>
        </StyledDnDToDoProviderButton>
      )}
    </SwapButtonComponent>
  );
};
