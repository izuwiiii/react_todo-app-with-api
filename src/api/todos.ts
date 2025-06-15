import { TodoType } from '../types/TodoType';
import { client } from '../utils/fetchClient';

export const USER_ID = 3085;

export const getTodos = () => {
  return client.get<TodoType[]>(`/todos?userId=${USER_ID}`);
};

export const postTodo = ({
  title,
  completed,
  userId,
}: Omit<TodoType, 'id'>) => {
  return client.post<TodoType>(`/todos`, {
    title,
    completed,
    userId,
  });
};

export const deleteTodo = (todoId: number) => {
  return client.delete(`/todos/${todoId}`);
};

export const updateTodo = (todoId: number, data: unknown) => {
  return client.patch(`/todos/${todoId}`, data);
};
