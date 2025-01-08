import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useTodosFetch } from '../../hooks/useTodosFetch';

import { DeleteModal } from '../../components/shared/DeleteModal';
import { CURRENT_MODE, CurrentToDoType } from './TodosPage.types';
import { BasePage } from '../../app/BasePage';
import { PAGES_MAP } from '../../constants';

import { DnDToDoProvider } from './components/DnDToDoProvider';

export const TodosPage = () => {
  const navigate = useNavigate();

  const [currentToDo, setCurrentToDo] = useState<CurrentToDoType>({
    currentId: '',
    mode: CURRENT_MODE.delete,
  });

  const { allTodos, areAllTodosLoading } = useTodosFetch();

  const modals = useMemo(
    () => ({
      [CURRENT_MODE.delete]: (
        <DeleteModal
          id={currentToDo.currentId}
          onClose={() => setCurrentToDo({ ...currentToDo, currentId: '' })}
          open={!!currentToDo.currentId}
        />
      ),
    }),
    [currentToDo],
  );

  return (
    <BasePage.Root>
      <BasePage.Title title={PAGES_MAP.dashboard} />
      <DnDToDoProvider />
      {currentToDo.currentId && modals[currentToDo.mode]}
    </BasePage.Root>
  );
};
