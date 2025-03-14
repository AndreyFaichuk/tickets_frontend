import { FC } from 'react';

import FileUploadIcon from '@mui/icons-material/FileUpload';
import { Button, ButtonProps, styled } from '@mui/material';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

type FileUploadButtonProps = ButtonProps & {
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const FileUploadButton: FC<FileUploadButtonProps> = ({
  fullWidth,
  onChange,
  ...rest
}) => {
  return (
    <Button
      component="label"
      variant="contained"
      tabIndex={-1}
      startIcon={<FileUploadIcon />}
      fullWidth={fullWidth}
      {...rest}>
      Upload files
      <VisuallyHiddenInput type="file" multiple onChange={onChange} />
    </Button>
  );
};
