import { FC, useEffect, useRef } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import AddIcon from '@mui/icons-material/Add';
import { IconButton, TextField } from '@mui/material';

import {
  StyledDnDToDoProviderButton,
  StyledDnDToDoProviderIconButton,
  StyledDnDToDoProviderNewColumn,
} from './AddNewColumnBlock.styled';

type AddNewColumnBlock = {
  isAddNewColumn: boolean;
  newColumnTitle: string;
  onChangeNewColumnName: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  onAddNewColumn: VoidFunction;
  onCancelNewColumn: VoidFunction;
  onOpenNewColumn: VoidFunction;
};

export const AddNewColumnBlock: FC<AddNewColumnBlock> = ({
  isAddNewColumn,
  newColumnTitle,
  onAddNewColumn,
  onCancelNewColumn,
  onChangeNewColumnName,
  onOpenNewColumn,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current && isAddNewColumn) {
      inputRef.current.focus();
    }
  }, [isAddNewColumn]);

  return (
    <StyledDnDToDoProviderButton>
      {isAddNewColumn ? (
        <StyledDnDToDoProviderNewColumn elevation={5}>
          <TextField
            value={newColumnTitle}
            variant="standard"
            onChange={(e) => onChangeNewColumnName(e)}
            inputRef={inputRef}
          />
          <IconButton
            autoFocus
            onClick={onAddNewColumn}
            sx={{ position: 'absolute', right: '40px', top: '76px' }}>
            <DoneIcon />
          </IconButton>
          <IconButton
            autoFocus
            onClick={onCancelNewColumn}
            sx={{ position: 'absolute', right: '0px', top: '76px' }}>
            <CloseIcon />
          </IconButton>
        </StyledDnDToDoProviderNewColumn>
      ) : (
        <>
          <StyledDnDToDoProviderIconButton
            onClick={onOpenNewColumn}
            type="button"
            size="large"
            color="secondary">
            <AddIcon />
          </StyledDnDToDoProviderIconButton>
        </>
      )}
    </StyledDnDToDoProviderButton>
  );
};
