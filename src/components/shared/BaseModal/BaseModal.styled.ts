import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  styled,
} from '@mui/material';

export const StyledBaseModal = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    minWidth: '400px',
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[5],
  },
}));

export const StyledBaseModalHeader = styled(DialogTitle)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  fontSize: theme.typography.h6.fontSize,
  fontWeight: theme.typography.fontWeightMedium,
}));

export const StyledBaseModalBody = styled(DialogContent)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

export const StyledBaseModalFooter = styled(DialogActions)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  gap: theme.spacing(1),
}));
