import React from 'react';
import { TodoType } from '../../types/TodoType';
import cn from 'classnames';

type TodoProps = {
  todo: TodoType | null;
  isLoading: boolean;
  handleDeleteTodo: (todoId: number) => void;
  deletingTodoId?: number | null;
  handleUpdateTodo?: (todoId: number, data: unknown) => void;
  updatingTodoId?: number | null;
  isUpdatingTodos?: boolean;
  updatingTodosIds?: number[];
};

export const Todo: React.FC<TodoProps> = ({
  todo,
  handleDeleteTodo,
  deletingTodoId,
  handleUpdateTodo,
  updatingTodoId,
  updatingTodosIds,
}) => {
  const isTodoLoaderActive =
    todo?.id === 0 ||
    todo?.id === deletingTodoId ||
    todo?.id === updatingTodoId ||
    updatingTodosIds?.includes(todo?.id || 1);

  return (
    <div data-cy="Todo" className={cn('todo', { completed: todo?.completed })}>
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo?.completed}
          onClick={() =>
            handleUpdateTodo?.(todo?.id || 1, { completed: !todo?.completed })
          }
        />
      </label>

      {false ? (
        <form>
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value="Todo is being edited now"
          />
        </form>
      ) : (
        <>
          <span data-cy="TodoTitle" className="todo__title">
            {todo?.title}
          </span>
          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={() => handleDeleteTodo(todo?.id || 1)}
          >
            ×
          </button>
        </>
      )}

      <div
        data-cy="TodoLoader"
        className={cn('modal overlay', {
          'is-active': isTodoLoaderActive,
        })}
      >
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
