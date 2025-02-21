import { FC } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { Controller } from 'react-hook-form';
import {
  StyledFormAttachmentButtonWrapper,
  StyledFormAttachmentPlaceholderWrapper,
  StyledFormAttachmentRoot,
} from './FormAttachmentBlock.styled';
import {
  convertFilesToFileList,
  mergeFiles,
} from './FormAttachmentBlock.utils';
import { FileUploadButton } from '../FileUploadButton';
import { AttachmentPreview } from './components/AttachmentPreview';
import { useAttachmentBlock } from './hooks/useAttachmentBlock';

type FormAttachmentBlockProps = {
  name: string;
  label: string;
};

export const FormAttachmentBlock: FC<FormAttachmentBlockProps> = ({
  name,
  label,
}) => {
  const {
    handlers: { onLeaveDragHandler, onRemoveAttachment, onStartDragHandler },
    attachments,
    isDragging,
    control,
    setIsDragging,
  } = useAttachmentBlock();

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
              const mergedFiles = mergeFiles(newFiles, existingFiles);
              field.onChange(mergedFiles);
            }}
            onDragOver={onStartDragHandler}>
            {isDragging && (
              <StyledFormAttachmentPlaceholderWrapper>
                <Typography textAlign="center" variant="h5">
                  Drop your files here
                </Typography>
              </StyledFormAttachmentPlaceholderWrapper>
            )}
            <Stack direction="row" gap={1.5} flexWrap="wrap">
              {attachments &&
                attachments.map((attachment, i) => {
                  const index = `${attachment.name}_${i}`;

                  const handleRemoveAttachment = (i: number) => {
                    const newAttachments = onRemoveAttachment(i);

                    const fileList = convertFilesToFileList(newAttachments);
                    field.onChange(fileList);
                  };

                  return (
                    <AttachmentPreview
                      file={attachment}
                      key={index}
                      onRemove={() => handleRemoveAttachment(i)}
                    />
                  );
                })}
            </Stack>
          </StyledFormAttachmentRoot>

          <StyledFormAttachmentButtonWrapper>
            <FileUploadButton
              onChange={(event) => {
                const input = event.target as HTMLInputElement;
                const files = input.files;
                if (!files) return;

                const mergedFiles = mergeFiles(files, field.value);
                field.onChange(mergedFiles);
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
