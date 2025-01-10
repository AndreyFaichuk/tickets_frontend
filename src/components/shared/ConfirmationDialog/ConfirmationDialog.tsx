import React, { FC } from 'react';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

type ConfirmationDialogProps = {
  isOpen: boolean;
  title: string;
  text: string;
  actions: React.ReactNode;
  onClose: VoidFunction;
};

export const ConfirmationDialog: FC<ConfirmationDialogProps> = ({
  actions,
  text,
  title,
  isOpen,
  onClose,
}) => {
  return (
    <React.Fragment>
      <Dialog open={isOpen} onClose={onClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{text}</DialogContentText>
        </DialogContent>
        <DialogActions>{actions}</DialogActions>
      </Dialog>
    </React.Fragment>
  );
};
