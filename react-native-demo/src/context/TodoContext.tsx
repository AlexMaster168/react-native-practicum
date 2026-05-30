import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from 'react';
import { loadTodos, saveTodos } from '@/storage/todos';
import type { Todo } from '@/types/todo';

interface TodoState {
  todos: Todo[];
  loading: boolean;
}

type Action =
  | { type: 'HYDRATE'; todos: Todo[] }
  | { type: 'ADD'; title: string }
  | { type: 'REMOVE'; id: string }
  | { type: 'UPDATE'; id: string; title: string }
  | { type: 'TOGGLE'; id: string };

function makeId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function reducer(state: TodoState, action: Action): TodoState {
  switch (action.type) {
    case 'HYDRATE':
      return { todos: action.todos, loading: false };
    case 'ADD':
      return {
        ...state,
        todos: [
          { id: makeId(), title: action.title, done: false, createdAt: Date.now() },
          ...state.todos,
        ],
      };
    case 'REMOVE':
      return { ...state, todos: state.todos.filter((t) => t.id !== action.id) };
    case 'UPDATE':
      return {
        ...state,
        todos: state.todos.map((t) => (t.id === action.id ? { ...t, title: action.title } : t)),
      };
    case 'TOGGLE':
      return {
        ...state,
        todos: state.todos.map((t) => (t.id === action.id ? { ...t, done: !t.done } : t)),
      };
    default:
      return state;
  }
}

interface TodoContextValue {
  todos: Todo[];
  loading: boolean;
  addTodo: (title: string) => void;
  removeTodo: (id: string) => void;
  updateTodo: (id: string, title: string) => void;
  toggleTodo: (id: string) => void;
}

const TodoContext = createContext<TodoContextValue | null>(null);

export function TodoProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { todos: [], loading: true });

  // Первичная загрузка из локального хранилища.
  useEffect(() => {
    loadTodos().then((todos) => dispatch({ type: 'HYDRATE', todos }));
  }, []);

  // Автосохранение при любом изменении списка (но не во время первичной загрузки).
  useEffect(() => {
    if (!state.loading) {
      saveTodos(state.todos);
    }
  }, [state.todos, state.loading]);

  const value = useMemo<TodoContextValue>(
    () => ({
      todos: state.todos,
      loading: state.loading,
      addTodo: (title) => dispatch({ type: 'ADD', title }),
      removeTodo: (id) => dispatch({ type: 'REMOVE', id }),
      updateTodo: (id, title) => dispatch({ type: 'UPDATE', id, title }),
      toggleTodo: (id) => dispatch({ type: 'TOGGLE', id }),
    }),
    [state.todos, state.loading]
  );

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
}

export function useTodos(): TodoContextValue {
  const ctx = useContext(TodoContext);
  if (!ctx) throw new Error('useTodos должен использоваться внутри TodoProvider');
  return ctx;
}
