import { TodoCard } from './components/TodoCard';
import { TodoCardProps } from './components/TodoCard/TodoCard.types';

import { TodosRoot } from './TodosPage.styles';

const todoCards: TodoCardProps[] = [
  {
    name: 'Build a Todo List',
    description: 'Create a basic Todo list app with React and TypeScript.',
    progress: 40,
    _id: '1',
  },
  {
    name: 'Setup Socket.io Integration',
    description: 'Integrate Socket.io for real-time updates on tasks.',
    progress: 6,
    _id: '2',
  },
  {
    name: 'Implement CRUD Operations',
    description:
      'Create API endpoints for managing tasks (Create, Read, Update, Delete).',
    progress: 3,
    _id: '3',
  },
  {
    name: 'UI/UX Design',
    description:
      'Design a simple and intuitive user interface for the Todo list app.',
    progress: 5,
    _id: '4',
  },
  {
    name: 'Write Tests',
    description:
      'Write unit and integration tests for components and API endpoints.',
    progress: 2,
    _id: '5',
  },
  {
    name: 'Build a Todo List',
    description: 'Create a basic Todo list app with React and TypeScript.',
    progress: 40,
    _id: '6',
  },
  {
    name: 'Setup Socket.io Integration',
    description: 'Integrate Socket.io for real-time updates on tasks.',
    progress: 6,
    _id: '7',
  },
];

export const TodosPage = () => {
  const handleDelete = (id: string) => {
    console.log('handleDelete', id);
  };
  const handleEdit = (id: string) => {
    console.log('handleEdit', id);
  };
  const handleView = (id: string) => {
    console.log('handleView', id);
  };

  return (
    <TodosRoot
      direction="row"
      flexWrap="wrap"
      justifyContent="flex-start"
      spacing={2}
      useFlexGap>
      {todoCards.map((todo, i) => {
        return (
          <TodoCard
            key={i}
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
        );
      })}
    </TodosRoot>
  );
};
