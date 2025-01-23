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
