import { FC, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import {
  StyledFormAttachmentButtonWrapper,
  StyledFormAttachmentPlaceholderWrapper,
  StyledFormAttachmentRoot,
} from './FormAttachmentBlock.styled';
import { checkIfCursorOutsideDropZone } from './FormAttachmentBlock.utils';
import { FileUploadButton } from '../FileUploadButton';

type FormAttachmentBlockProps = {
  name: string;
  label: string;
};

export const FormAttachmentBlock: FC<FormAttachmentBlockProps> = ({
  name,
  label,
}) => {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const { control } = useFormContext();

  const onStartDragHandler = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const onLeaveDragHandler = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    const isCursorOutsideDropZone = checkIfCursorOutsideDropZone(event);

    if (isCursorOutsideDropZone) {
      setIsDragging(false);
    }
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Box>
          <Typography variant="subtitle2" gutterBottom>
            {label}
          </Typography>

          <StyledFormAttachmentRoot
            flexWrap="wrap"
            isDragging={isDragging}
            onDragStart={onStartDragHandler}
            onDragLeave={onLeaveDragHandler}
            onDrop={(event) => {
              event.preventDefault();
              setIsDragging(false);

              const existingFiles = Array.from(field.value || []) as File[];

              const newFiles = Array.from(event.dataTransfer.files);

              const updatedFiles = [...existingFiles, ...newFiles];

              const dataTransfer = new DataTransfer();
              updatedFiles.forEach((file) =>
                dataTransfer.items.add(file as File),
              );

              field.onChange(dataTransfer.files);
            }}
            onDragOver={onStartDragHandler}
          >
            {isDragging && (
              <StyledFormAttachmentPlaceholderWrapper>
                <Typography textAlign="center" variant="h5">
                  Drop your files here
                </Typography>
              </StyledFormAttachmentPlaceholderWrapper>
            )}
          </StyledFormAttachmentRoot>

          <StyledFormAttachmentButtonWrapper>
            <FileUploadButton
              onChange={(event) => {
                const input = event.target as HTMLInputElement;
                const files = input.files;

                if (files) {
                  const existingFiles = Array.from(field.value || []);

                  const newFiles = Array.from(files);
                  const updatedFiles = [...existingFiles, ...newFiles];

                  const dataTransfer = new DataTransfer();
                  updatedFiles.forEach((file) =>
                    dataTransfer.items.add(file as File),
                  );

                  field.onChange(dataTransfer.files);
                }
              }}
            />
          </StyledFormAttachmentButtonWrapper>

          {error && (
            <Typography variant="body2" color="error" sx={{ marginTop: '8px' }}>
              {error.message}
            </Typography>
          )}
        </Box>
      )}
    />
  );
};
