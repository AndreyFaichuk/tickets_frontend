import { Avatar, IconButton, Paper, styled, Typography } from '@mui/material';

export const StyledFormAttachmentRoot = styled(Paper)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  width: '30%',
  minHeight: '56px',
  gap: theme.spacing(1),
  position: 'relative',
  '&:hover .deleteButton': {
    display: 'block',
  },
}));

export const StyledFormAttachmentName = styled(Typography)(() => ({
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  WebkitLineClamp: 1,
  textOverflow: 'ellipsis',
  cursor: 'pointer',
}));

export const StyledFormAttachmentImage = styled(Avatar)(({ theme }) => ({
  width: '40px',
  height: '40px',
  borderRadius: theme.shape.borderRadius,
}));

export const StyledFormAttachmentTypeWrapper = styled(Paper)(() => ({
  width: '25px',
  height: '15px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: 'unset',
  position: 'absolute',
  top: '36px',
  right: '3px',
}));

export const StyledFormAttachmentTypeLabel = styled(Typography)(() => ({
  fontSize: '0.45rem',
}));

export const StyledFormAttachmentButton = styled(IconButton)(() => ({
  display: 'none',
  position: 'absolute',
  right: '-17px',
  top: '-14px',
}));
