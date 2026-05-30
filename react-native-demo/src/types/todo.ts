export interface Todo {
  id: string;
  title: string;
  /** Новое поле: отметка выполнения (в старой версии её не было). */
  done: boolean;
  createdAt: number;
}

/** Фильтр списка по статусу выполнения. */
export type TodoFilter = 'all' | 'active' | 'completed';

export const FILTER_LABELS: Record<TodoFilter, string> = {
  all: 'Все',
  active: 'Активные',
  completed: 'Готовые',
};
