import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useQueryClient } from '@tanstack/react-query';

import { todosQueryKeys } from './useTodosFetch';
import { TodoCardProps } from '../pages/TodosPage/components/TodoCard/TodoCard.types';

const SOCKET_URL = 'http://localhost:8000';
const EVENT_NAME = 'update-todo-progress';

type SocketTodoProgressData = {
  _id: string;
  progress: number;
};

export const useSocketTodos = () => {
  const queryClient = useQueryClient();
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const socket = io(SOCKET_URL, {
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    socket.on(EVENT_NAME, (data: SocketTodoProgressData) => {
      queryClient.setQueryData(
        todosQueryKeys.todos.all(),
        (oldTodos: TodoCardProps[]) => {
          if (!oldTodos) return [];

          return oldTodos.map((todo) =>
            todo._id === data._id
              ? { ...todo, progress: Math.min(data.progress, 100) }
              : todo,
          );
        },
      );
    });

    socket.on('connect_error', () => {
      setIsConnected(false);
    });

    socket.on('connect', () => {
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    return () => {
      socket.disconnect();
    };
  }, [queryClient]);

  return { isConnected };
};
