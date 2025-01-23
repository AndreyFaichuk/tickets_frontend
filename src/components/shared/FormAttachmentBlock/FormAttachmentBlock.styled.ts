import { Box, Stack, styled } from '@mui/material';

export const StyledFormAttachmentRoot = styled(Stack, {
  shouldForwardProp: (prop) => prop !== 'isDragging',
})<{ isDragging: boolean }>(({ theme, isDragging }) => ({
  width: '100%',
  borderRadius: theme.shape.borderRadius,
  border: `2px dashed ${theme.palette.grey[500]}`,
  padding: theme.spacing(1),
  minHeight: '150px',
  maxWidth: '555px',
  maxHeight: '250px',
  overflowY: 'auto',
  ...(isDragging && {
    backgroundColor: theme.palette.grey[200],
    border: `2px solid ${theme.palette.grey[500]}`,
  }),
}));

export const StyledFormAttachmentButtonWrapper = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(1),
}));

export const StyledFormAttachmentPlaceholderWrapper = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '130px',
}));
