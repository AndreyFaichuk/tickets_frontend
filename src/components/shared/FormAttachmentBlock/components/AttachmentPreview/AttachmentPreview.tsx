import React, { useState } from 'react';
import { Tooltip } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import {
  StyledFormAttachmentButton,
  StyledFormAttachmentImage,
  StyledFormAttachmentName,
  StyledFormAttachmentRoot,
  StyledFormAttachmentTypeLabel,
  StyledFormAttachmentTypeWrapper,
} from './AttachmentPreview.styled';
import {
  ATTACHMENT_ICON_MAP,
  ATTACHMENTS_TYPE_MAP,
  AttachmentType,
} from './AttachmentPreview.constants';

interface DocumentPreviewProps {
  file: File;
  onRemove: VoidFunction;
}

export const AttachmentPreview: React.FC<DocumentPreviewProps> = ({
  file,
  onRemove,
}) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const isImage = file.type.startsWith('image/');

  if (isImage && !imageUrl) {
    const url = URL.createObjectURL(file);
    setImageUrl(url);
  }

  const handleFileClick = () => {
    const fileUrl = URL.createObjectURL(file);
    window.open(fileUrl, '_blank');
  };

  const imageSrc = imageUrl
    ? imageUrl
    : ATTACHMENT_ICON_MAP[file.type as AttachmentType];

  const fileType = ATTACHMENTS_TYPE_MAP[file.type];

  return (
    <StyledFormAttachmentRoot>
      <StyledFormAttachmentImage src={imageSrc} alt={file.name} />
      <Tooltip title={file.name} placement="top">
        <StyledFormAttachmentName onClick={handleFileClick} variant="caption">
          {file.name}
        </StyledFormAttachmentName>
      </Tooltip>
      {fileType && (
        <StyledFormAttachmentTypeWrapper>
          <StyledFormAttachmentTypeLabel variant="subtitle2">
            {ATTACHMENTS_TYPE_MAP[file.type]}
          </StyledFormAttachmentTypeLabel>
        </StyledFormAttachmentTypeWrapper>
      )}
      <StyledFormAttachmentButton
        className="deleteButton"
        disableRipple
        size="small"
        onClick={onRemove}
      >
        <CloseIcon />
      </StyledFormAttachmentButton>
    </StyledFormAttachmentRoot>
  );
};
