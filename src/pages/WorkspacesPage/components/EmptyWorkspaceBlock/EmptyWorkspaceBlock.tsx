import { FC } from 'react';
import { Button } from '@mui/material';
import {
  StyledEmptyWorkspaceBlockRoot,
  StyledEmptyWorkspaceBlockTitle,
} from './EmptyWorkspaceBlock.styled';
import { SwapButtonComponent } from '../../../../components/shared/SwapButtonComponent';

type EmptyWorkspaceBlockProps = {
  onCreateWorkspace: (title: string) => void;
};

export const EmptyWorkspaceBlock: FC<EmptyWorkspaceBlockProps> = ({
  onCreateWorkspace,
}) => {
  return (
    <StyledEmptyWorkspaceBlockRoot>
      <StyledEmptyWorkspaceBlockTitle variant="h5">
        You do not have active workspaces yet, create the first one below
      </StyledEmptyWorkspaceBlockTitle>
      <SwapButtonComponent onApprove={onCreateWorkspace}>
        {(handleSwap) => (
          <Button variant="contained" color="success" onClick={handleSwap}>
            Create
          </Button>
        )}
      </SwapButtonComponent>
    </StyledEmptyWorkspaceBlockRoot>
  );
};
