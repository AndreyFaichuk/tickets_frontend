import { useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { checkIfCursorOutsideDropZone } from '../FormAttachmentBlock.utils';

export const useAttachmentBlock = () => {
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

  const attachments: FileList = useWatch({
    control,
    name: 'attachments',
  });

  const onRemoveAttachment = (index: number) => {
    const copyAttachments = [...attachments];
    copyAttachments.splice(index, 1);

    return copyAttachments;
  };

  return {
    handlers: {
      onStartDragHandler,
      onLeaveDragHandler,
      onRemoveAttachment,
    },
    isDragging,
    attachments: attachments ? Array.from(attachments) : [],
    control,
    setIsDragging,
  };
};
