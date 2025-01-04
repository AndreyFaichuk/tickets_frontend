import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useTodosFetch } from '../../hooks/useTodosFetch';
import { TodoCard } from './components/TodoCard';
import { TodosStack } from './TodosPage.styled';
import { Skeletons } from '../../components/shared/Skeletons';
import { EditTodoModal } from './components/EditToDoModal';
import { DeleteModal } from '../../components/shared/DeleteModal';
import { CURRENT_MODE, CurrentToDoType } from './TodosPage.types';
import { InfoModal } from '../../components/shared/InfoModal';
import { BasePage } from '../../app/BasePage';
import { PAGES_MAP } from '../../constants';

export const TodosPage = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [currentToDo, setCurrentToDo] = useState<CurrentToDoType>({
    currentId: '',
    mode: CURRENT_MODE.view,
  });

  const { allTodos, areAllTodosLoading } = useTodosFetch();

  const handleEdit = (id: string) => {
    navigate(`/app/todos/${id}`);
  };

  const handleDelete = (id: string) => {
    setCurrentToDo({ currentId: id, mode: CURRENT_MODE.delete });
  };

  const handleView = (id: string) => {
    setCurrentToDo({ currentId: id, mode: CURRENT_MODE.view });
  };

  const modals = useMemo(
    () => ({
      [CURRENT_MODE.delete]: (
        <DeleteModal
          id={currentToDo.currentId}
          onClose={() => setCurrentToDo({ ...currentToDo, currentId: '' })}
          open={!!currentToDo.currentId}
        />
      ),
      [CURRENT_MODE.view]: (
        <InfoModal
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
      <TodosStack spacing={2} useFlexGap>
        {areAllTodosLoading ? (
          <Skeletons numbers={10} />
        ) : (
          allTodos.map((todo) => (
            <TodoCard
              key={todo._id}
              description={todo.description}
              name={todo.name}
              progress={todo.progress}
              _id={todo._id}
              actions={{
                onDelete: handleDelete,
                onEdit: handleEdit,
                onView: handleView,
              }}
            />
          ))
        )}
      </TodosStack>

      {id && <EditTodoModal currentToDoId={id} />}
      {currentToDo.currentId && modals[currentToDo.mode]}
    </BasePage.Root>
  );
};
