import { ALLOWED_FILE_TYPES_MAP } from '../../components/shared/ToDoForm/ToDoForm.constants';
import { TodoValues } from '../../components/shared/ToDoForm/ToDoForm.schema';
import { TodoCardProps } from '../TodosPage/components/TodoCard/TodoCard.types';

const getFileNameFromUrl = (url: string): string => {
  return url.split('/').pop()?.split('?')[0] || 'unknown';
};

const urlToFile = async (url: string): Promise<File> => {
  const response = await fetch(url);
  const blob = await response.blob();
  const fileName = getFileNameFromUrl(url);
  const fileType = fileName.split('.').pop();

  return new File([blob], fileName, {
    type: ALLOWED_FILE_TYPES_MAP[
      fileType as keyof typeof ALLOWED_FILE_TYPES_MAP
    ],
  });
};

export const normalizeFormData = async (
  todo: TodoCardProps,
): Promise<TodoValues> => {
  const attachmentsPromises = todo.attachmentsUrls.map((attachment) =>
    urlToFile(attachment),
  );

  const attachmentsFiles = await Promise.all(attachmentsPromises);

  return {
    description: todo.description,
    name: todo.name,
    progress: todo.progress,
    priority: todo.priority,
    attachments: attachmentsFiles,
  };
};
