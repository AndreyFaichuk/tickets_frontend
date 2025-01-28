export const checkIfCursorOutsideDropZone = (
  event: React.DragEvent<HTMLDivElement>,
): boolean => {
  const { clientX, clientY } = event;
  const rect = event.currentTarget.getBoundingClientRect();

  if (
    clientX < rect.left ||
    clientX > rect.right ||
    clientY < rect.top ||
    clientY > rect.bottom
  )
    return true;
  return false;
};

export const convertFilesToFileList = (files: File[]) => {
  const dataTransfer = new DataTransfer();
  files.forEach((file) => dataTransfer.items.add(file as File));

  return dataTransfer.files;
};

export const mergeFiles = (
  files: FileList | File[],
  oldFiles: File[],
): FileList => {
  const existingFiles = Array.from(oldFiles || []);

  const newFiles = Array.from(files);
  const updatedFiles = [...existingFiles, ...newFiles];

  return convertFilesToFileList(updatedFiles);
};
